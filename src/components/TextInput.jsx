import React, { Component } from "react";
import axios from "axios";
import { Form, Button, TextArea, Popup } from "semantic-ui-react";
import "./TextInput.css";
const footerStyle = {
  backgroundColor: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "15px",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  display: "grid",
  placeItems: "center",
};

class TextInput extends Component {
  state = { commentInput: "" };
  handleChange = (e, { commentInput, value }) =>
    this.setState({ [commentInput]: value });
  renderReplyBanner = () => {
    const { commentInput } = this.state;
    const { isReplying } = this.props;

    if (isReplying.active) {
      return (
        <Popup
          className="comment-popup"
          open
          position="top left"
          size="mini"
          trigger={
            <TextArea
              className="commentBox"
              //  style={{ minHeight: 100 }}
              placeholder={`@${isReplying.userName}`}
              commentInput="commentInput"
              value={commentInput}
              onChange={this.handleChange}
            />
          }
        >
          Replying to{" "}
          <a
            style={{ color: "white" }}
            href={"https://open.spotify.com/user/".concat(isReplying.userId)}
          >
            {isReplying.userName}
          </a>
        </Popup>
      );
    } else {
      return (
        <TextArea
          //  style={{ minHeight: 100 }}
          className="commentBox"
          placeholder="Say Something"
          commentInput="commentInput"
          value={commentInput}
          onChange={this.handleChange}
        />
      );
    }
  };

  handleSubmit = () => {
    const { commentInput } = this.state;
    const { songId, renderComments, isReplying, getReplyInfo } = this.props;

    if (isReplying.active) {
      axios
        .patch("http://localhost:8888/api/comments/reply", {
          id: `${isReplying.id}`, //song ID
          text: commentInput, //Input
        })
        .then(function (response) {
          console.log(response);
          renderComments(songId);
          getReplyInfo(false, "", "", "");
        })
        .catch(function (error) {
          console.log(error);
        });
      this.setState({ commentInput: "" });
    } else {
      axios
        .post("http://localhost:8888/api/comments/", {
          songId: songId, //song ID
          text: commentInput, //Input
        })
        .then(function (response) {
          console.log(response);
          renderComments(songId);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.setState({ commentInput: "" });
    }
  };

  render() {
    const { commentInput } = this.state;

    return (
      <div>
        <div style={footerStyle}>
          <Form className="comment-text" onSubmit={this.handleSubmit}>
            {this.renderReplyBanner()}

            <Button
              id="submitButton"
              style={{
                background: "#0fc99d",
                color: "white",
                "margin-top": "10px",
              }}
              content="Comment"
              labelPosition="right"
              icon="arrow right"
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default TextInput;
