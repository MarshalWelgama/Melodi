/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
var SpotifyWebApi = require("spotify-web-api-node");

var client_id = "3b5576f93c1f4677856be16b0ef60fd8"; // Your client id
var client_secret = "91dac900482144dfa9ca56d8afabcc96"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

var access_token = "",
  refresh_token = "";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email user-read-playback-state";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.json({
      error: "state_mismatch",
    });
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        spotifyApi.setAccessToken(access_token);

        // var options = {
        //   url: "https://api.spotify.com/v1/me",
        //   headers: { Authorization: "Bearer " + access_token },
        //   json: true,
        // };

        // use the access token to access the Spotify Web API
        // request.get(options, function (error, response, body) {
        //   console.log(body);
        // });

        // we can also pass the token to the browser to make requests from there
        res.redirect("http://localhost:3000/main/");
      } else {
        res.json({
          error: "invalid_token",
        });
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

app.get("/user", function (req, res) {
  let userData = {
    id: "",
    name: "",
    email: "",
    countryCode: "",
    image: "",
    link: "",
  };
  console.log("Access token in /user - ", access_token);
  console.log("Refresh token in /user - ", refresh_token);

  spotifyApi
    .getMe()
    .then((response) => {
      if (response) {
        console.log("getMe Response - ", response);
        userData = {
          id: response.body.id,
          name: response.body.display_name,
          email: response.body.email,
          countryCode: response.body.country,
          image: response.body.images,
          link: response.body.external_urls.spotify,
        };
      }
      res.json(userData);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/nowplaying", function (req, res) {
  let nowPlaying = {
    name: "Nothing playing at the moment",
    albumArt: "",
  };
  console.log("Access token in /user - ", access_token);
  console.log("Refresh token in /user - ", refresh_token);

  spotifyApi
    .getMyCurrentPlaybackState()
    .then((response) => {
      if (response) {
        console.log("getMyCurrentPlaybackState Response - ", response);
        nowPlaying = {
          name: response.body.item.name,
          albumArt: response.body.item.album.images[0].url,
        };
      }
      res.json(nowPlaying);
    })
    .catch((error) => {
      res.json(error);
    });
});

console.log("Listening on 8888");
app.listen(8888);
