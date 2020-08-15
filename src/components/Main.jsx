import React, { Component } from "react";
import "./Main.css";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Main extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if (response) {
        console.log("Response - ", response);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
          },
        });
      } else {
        this.setState({
          nowPlaying: {
            name: "Nothing playing at the moment",
            albumArt: "",
          },
        });
      }
    });
  }

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
