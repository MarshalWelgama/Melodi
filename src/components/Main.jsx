import React, { Component } from "react";
import "./Main.css";
import axios from "axios";
import { Search } from "semantic-ui-react";
import SearchBar from "./SearchBar";



class Main extends Component {
  state = {
    loggedIn: false,
    nowPlaying: { name: "Not Checked", albumArt: "" },
  };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    let userData = await axios.get("http://localhost:8888/api/users/current");
    if (userData.data.userId) {
      console.log(userData.data)
      this.setState({ loggedIn: true });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return userData;
  };

  getNowPlaying = async () => {
    let nowPlayingData = await axios.get(
      "http://localhost:8888/api/songs/current"
    );
    if (nowPlayingData.data) {
      let nowPlaying = {
        name: nowPlayingData.data.name,
        albumArt: nowPlayingData.data.albumArt,
      };
      this.setState({ nowPlaying });
      window.location.href = "http://localhost:3000/songs/".concat(
        nowPlayingData.data.songId
      );
    } else {
      console.log("ELSE TRIGGERED");
    }
    return nowPlayingData;
  };

  
  render() {
    return (
      <React.Fragment>
      
              {this.state.loggedIn && (
                <div className="main-page">
                  <header>MELODI </header>
                  <h1 className="title">Where to?</h1>
                  <div className="actions">
                 <a style={{"text-decoration":'none', 'color':'black'}}className="main-button"
                  onClick={() => this.getNowPlaying()}>
                 Now Playing
               </a>
               <SearchBar></SearchBar>
               </div>
               </div>
              )}
            
        </React.Fragment>
    );
  }
}

export default Main;
