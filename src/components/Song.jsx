import React, { Component, createRef } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import { withRouter } from "react-router";
import Comments from "./Comments";
import SongHeader from "./SongHeader";
import { Form, Button, TextArea, Sticky, Ref } from "semantic-ui-react";
import TextInput from "./TextInput";

class Song extends Component {
  state = {
    replied: { active: false, id: "", userName: "", userId: "" },
    user: { name: "", image: "", userId: "", link: "" },
    song: {
      songId: "",
      name: "Not Checked",
      artist: [],
      albumArt: "",
      comments: [],
    },
  };
  //contextRef = createRef()

  constructor(props) {
    super(props);
    const songId = props.match.params.songId;
    console.log("songId in constructor - ", songId);
    this.getSongDetails(songId);
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    let userData = await axios.get("http://localhost:8888/api/users/current");
    let user;
    if (userData.data.userId) {
      user = {
        name: userData.data.name,
        image: userData.data.image,
        userId: userData.data.userId,
        link: userData.data.link,
      };
      this.setState({ user });
      console.log(this.state.user);
      // this.setState({ loggedIn: true });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return userData;
  };

  getSongDetails = async (songId) => {
    try {
      let songData = await axios.get(
        "http://localhost:8888/api/songs/".concat(songId)
      );

      console.log("updated");
      console.log(songData);
      if (songData.data) {
        let song = {
          name: songData.data.songName,
          artist: songData.data.artistsName,
          albumArt: songData.data.albumArt,
          comments: songData.data.comments,
          songId: songData.data.songId,
        };
        this.setState({ song });
      } else {
        console.log("NO SONGGG");
      }
      console.log("this si song data", songData);
      return songData;
    } catch (error) {
      window.location.replace("/main");
    }
  };

  getReplyInfo = (isActive, commentId, currentUserName, currentUserId) => {
    let replied = {
      active: isActive,
      id: commentId,
      userName: currentUserName,
      userId: currentUserId,
    };
    this.setState({ replied });
    console.log("sheeeeit");
    console.log(this.state);
  };

  // handleClick = () => {
  // this.setState((prevState) => ({ active: !prevState.active }))
  //   console.log(this.state)
  // }

  render() {
    const commentsArray = this.state.song.comments;
    console.log(commentsArray);
    let commentsActive = Array.isArray(commentsArray) && commentsArray.length;
    console.log(commentsActive);
    const { songId } = this.state.song;
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
        <SongHeader
          albumArt={this.state.song.albumArt}
          artist={this.state.song.artist}
          songName={this.state.song.name}
          user={this.state.user}
        />
        <Comments
          comments={this.state.song.comments}
          userId={this.state.user.userId}
          renderComments={this.getSongDetails}
          songId={songId}
          getReplyInfo={this.getReplyInfo}
          isReplying={this.state.replied}
        />
        <TextInput
          getReplyInfo={this.getReplyInfo}
          songId={songId}
          renderComments={this.getSongDetails}
          isReplying={this.state.replied}
        />
        <div style={{ paddingBottom: "175px" }} />
      </div>
    );
  }
}

export default withRouter(Song);
