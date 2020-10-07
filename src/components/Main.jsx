import React, { Component } from "react";
import "./Main.css";
import axios from "axios";
import { Search } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import FooterInfo from "./FooterInfo";
import RecentBox from "./RecentBox";



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
            <div className="melodi-header">
            <header><img className="header-img" src="/melodi-logo.png" verticalAlign='top' /> </header>
            </div>
            <div>
            <h1 className="title">Where to?</h1>
            </div>
            <div className="main-actions">
              <a href="#" style={{ "text-decoration": 'none', 'color': 'black' }} className="main-button"
                onClick={() => this.getNowPlaying()}>
                Now Playing
               </a>
              <div className="search-bar" >
                <SearchBar ></SearchBar>
              </div>
            </div> {/*main actions*/}
            
            <div className="quick-actions">
              <RecentBox style={{'width':'350px !important'}} />
              <RecentBox />
            </div>
            <FooterInfo className="footer-info" />
          </div>

        )}

      </React.Fragment>
    );
  }
}

export default Main;
