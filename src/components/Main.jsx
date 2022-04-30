import React, { Component } from "react";
import qs from "qs";
import "./Main.css";
import axios from "axios";
import { Search } from "semantic-ui-react";
import SpotifyWebApi from "spotify-web-api-node";
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

class Main extends Component {
  state = {
    access_token: "",
    loggedIn: false,
    nowPlaying: { name: "Not Checked", albumArt: "" },
  };

  componentDidMount() {
    //const queryValues = queryString(UrlQueryStrings);
    // const { access_token } = this.props.match.params;
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const access_token = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).access_token;

    this.setState({ access_token: access_token });

    if (access_token) {
      spotifyApi.setAccessToken(access_token);
      this.props.history.replace("/main");
      console.log("reaplced");
      spotifyApi.getMe().then((response) => {
        if (response) {
          console.log(response.body);
        }
      });
      console.log("logged in");
      this.setState({ loggedIn: true });
    } else {
      console.log("ELSE TRIGGERED");
    }
  };

  // getNowPlaying = async () => {
  //   let nowPlayingData = await axios.get(
  //     "http://localhost:8888/api/songs/current"
  //   );
  //   if (nowPlayingData.data) {
  //     let nowPlaying = {
  //       name: nowPlayingData.data.name,
  //       albumArt: nowPlayingData.data.albumArt,
  //     };
  //     this.setState({ nowPlaying });
  //     window.location.href = "http://localhost:3000/songs/".concat(
  //       nowPlayingData.data.songId
  //     );
  //   } else {
  //     console.log("ELSE TRIGGERED");
  //   }
  //   return nowPlayingData;
  // };

  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn && (
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
                onClick={() => console.log(this.state)}
              >
                Now Playing
              </a>
              <div className="search-bar">
                <SearchBar></SearchBar>
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
  }
}

export default Main;
