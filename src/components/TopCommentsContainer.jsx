import React, { Component } from "react";
import RecentBox from "./RecentBox";
import axios from "axios";
import { Loader } from "semantic-ui-react";

class TopCommentsContainer extends Component {
  state = { commentData: [] };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getRecentDetails();
  }

  getRecentDetails = async () => {
    let RecentCommentData = await axios.get(
      "http://localhost:8888/api/comments/Top"
    );
    if (RecentCommentData.data) {
      let commentData = [];
      for (let i = 0; i < RecentCommentData.data.length; i++) {
        commentData.push({
          albumArt: RecentCommentData.data[i].albumArt,
          songId: RecentCommentData.data[i].songId,
          songName: RecentCommentData.data[i].userName,
          artists: [RecentCommentData.data[i].text],
        });
      }
      this.setState({ commentData });
    } else {
      console.log("ELSE TRIGGERED");
    }
    return RecentCommentData;
  };

  render() {
    const { commentData } = this.state;

    return commentData.length ? (
      <RecentBox name={"Top Comments"} data={commentData}></RecentBox>
    ) : (
      <React.Fragment>
        <Loader active inline="centered" content="Loading" />
      </React.Fragment>
    );
  }
}

export default TopCommentsContainer;
