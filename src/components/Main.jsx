import React, { Component } from "react";
import "./Main.css";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

const spotifyApi = new SpotifyWebApi();

class Main extends Component {
  state = {
    loggedIn: false,
    nowPlaying: { name: "Not Checked", albumArt: "" },
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    let userData = await axios.get("http://localhost:8888/api/users/current");
    if (userData.data.id) {
      this.setState({ loggedIn: true });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return userData;
  };

  getNowPlaying = async () => {
    let nowPlayingData = await axios.get("http://localhost:8888/nowplaying");
    if (nowPlayingData.data) {
      let nowPlaying = {
        name: nowPlayingData.data.name,
        albumArt: nowPlayingData.data.albumArt,
      };
      this.setState({ nowPlaying });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return nowPlayingData;
  };

  render() {
    return (
      <div className="main-page container-fluid justify-content-center">
        <div
          className="row justify-content-center p-4"
          style={{ height: "50%" }}
        >
          <img
            src={this.state.nowPlaying.albumArt}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="row my-auto" style={{ height: "50%" }}>
          <div className="col">
            <div className="row justify-content-center">
              <h2 className="info-text">
                Now Playing: {this.state.nowPlaying.name}
              </h2>
            </div>
            <div className="row justify-content-center">
              {this.state.loggedIn && (
                <button
                  className="main-button"
                  onClick={() => this.getNowPlaying()}
                >
                  Check Now Playing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
