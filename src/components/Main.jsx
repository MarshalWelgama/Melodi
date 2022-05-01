import React, { useEffect, useState } from "react";
import qs from "qs";
import "./Main.css";
import axios from "axios";
import { Search } from "semantic-ui-react";
import SpotifyWebApi from "spotify-web-api-node";
import { useLocation, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import FooterInfo from "./FooterInfo";
import RecentSongsContainer from "./RecentSongsContainer";
import TopCommentsContainer from "./TopCommentsContainer";

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

const Main = () => {
  const [access_token, setAccessToken] = useState("");
  const [refresh_token, setResfreshToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [nowPlaying, setnowPlaying] = useState({
  //   name: "Not Checked",
  //   albumArt: "",
  // });
  const search = useLocation().search;
  const access_token_url = new URLSearchParams(search).get("access_token");
  const refresh_token_url = new URLSearchParams(search).get("refresh_token");
  const history = useHistory();
  useEffect(() => {
    setToken();
    getInfo();
  }, []);

  const setToken = () => {
    if (access_token_url) {
      localStorage.setItem("access_token", access_token_url);
      localStorage.setItem("refresh_token", refresh_token_url);
      setAccessToken(access_token_url);
      setResfreshToken(refresh_token_url);
      spotifyApi.setAccessToken(access_token_url);
      spotifyApi.setRefreshToken(refresh_token_url);
      setLoggedIn(true);
      history.replace("/main");
    }
  };

  const getInfo = () => {
    spotifyApi.getMe().then((response) => {
      if (response) {
        console.log(response.body);
      }
    });
  };

  const getNowPlaying = async () => {
    let track = await spotifyApi.getMyCurrentPlayingTrack().catch((err) => {
      console.log("Error when retrieving song - ", err);
      if (err.statusCode === 401) {
        console.log("Unauthorised access - sign in using Spotify again");
      }
    });
    if (track.body) {
      // window.location.href = "http://localhost:3000/songs/".concat(
      //   track.body.item.id
      // );
      console.log(track.body.item);
    }
  };

  return (
    <React.Fragment>
      {loggedIn && (
        <div className="main-page">
          <div className="melodi-header">
            <header>
              <img
                className="header-img"
                src="/melodi-logo.png"
                verticalAlign="top"
              />{" "}
            </header>
          </div>
          <div>
            <h1 className="title">Where to?</h1>
          </div>
          <div className="main-actions">
            <a
              href="#"
              style={{ "text-decoration": "none", color: "black" }}
              className="main-button"
              onClick={() => getNowPlaying()}
            >
              Now Playing
            </a>
            <div className="search-bar">
              <SearchBar spotify={spotifyApi}></SearchBar>
            </div>
          </div>{" "}
          {/*main actions*/}
          <div className="quick-actions">
            <RecentSongsContainer />
            <TopCommentsContainer />
          </div>
          <FooterInfo className="footer-info" />
        </div>
      )}
    </React.Fragment>
  );
};

export default Main;
