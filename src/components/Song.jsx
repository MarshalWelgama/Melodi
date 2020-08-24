import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import { withRouter } from "react-router";

class Song extends Component {
  state = { song: { name: "Not Checked", albumArt: "" } };

  constructor(props) {
    super(props);
    const songId = props.match.params.songId;
    console.log("songId in constructor - ", songId);
    this.getSongDetails(songId);
  }

  getSongDetails = async (songId) => {
    let songData = await axios.get(
      "http://localhost:8888/api/songs/".concat(songId)
    );
    if (songData.data) {
      let song = {
        name: songData.data.name,
        albumArt: songData.data.albumArt,
      };
      this.setState({ song });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return songData;
  };

  render() {
    return (
      <div className="main-page container-fluid justify-content-center">
        <div
          className="row justify-content-center p-4"
          style={{ height: "50%" }}
        >
          <img
            src={this.state.song.albumArt}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="row my-auto" style={{ height: "50%" }}>
          <div className="col">
            <div className="row justify-content-center">
              <h2 className="info-text"> {this.state.song.name}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Song);
