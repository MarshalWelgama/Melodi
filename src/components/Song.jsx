import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import { withRouter } from "react-router";
import Comments from "./Comments";



class Song extends Component {
  state = { song: { name: "Not Checked", artist: "Not Checked", albumArt: "", comments: []}};

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
    console.log(songData)
    if (songData.data) { 
      let song = {
        name: songData.data.name,
        artist: songData.data.artist,
        albumArt: songData.data.albumArt,
        comments: songData.data.comments
      };
      this.setState({ song });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return songData;
  };

  renderComments() {
    const comments = this.state.song.comments
    var prettyComments = []
    for (var i = 0; i < comments.length; i++) {
      prettyComments.push(comments[i].text)
      }

      console.log(prettyComments)
      return ( 
        <React.Fragment>
          {prettyComments.map(comment => (
            <a key={comment}>{comment}</a>
          ))}
        </React.Fragment>
      );
    }
  
  render() {
    const commentsArray = this.state.song.comments
    console.log(commentsArray);
    let commentsActive = (Array.isArray(commentsArray) && commentsArray.length);
    console.log(commentsActive)
    return (
      // <div className="main-page container-fluid justify-content-center">
      //   <div
      //     className="row justify-content-center p-4"
      //     style={{ height: "50%" }}
      //   >
      //     <img
      //       src={this.state.song.albumArt}
      //       style={{ maxWidth: "100%", maxHeight: "100%" }}
      //     />
      //   </div>
      //   <div className="row my-auto" style={{ height: "50%" }}>
      //     <div className="col">
      //       <div className="row justify-content-center">
      //         <h2 className="info-text"> {this.state.song.name}</h2>
      //         {console.log(this.state.song.artist)}
      //       </div>
      //       <div>
      //         {this.renderComments()}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="main-page">
      <Comments name={this.state.song.name} artist={this.state.song.artist} albumArt={this.state.song.albumArt} comments={this.state.song.comments}></Comments>
      </div>
    );
  }
}

export default withRouter(Song);