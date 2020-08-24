const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Comment = require("../models/comment");

// Getting current song
router.get("/current", async function (req, res) {
  let nowPlaying = {
    name: "Nothing playing at the moment",
    albumArt: "",
  };

  spotifyApi
    .getMyCurrentPlaybackState()
    .then((response) => {
      if (response) {
        nowPlaying = {
          songId: response.body.item.id,
          name: response.body.item.name,
          albumArt: response.body.item.album.images[0].url,
          previewURL: response.body.item.preview_url,
          comments: [],
        };
        getSongComments(response.body.item.id).then((response) => {
          if (response.message) {
            nowPlaying.comments = [];
          } else {
            nowPlaying.comments = response;
          }
        });

        res.json(nowPlaying);
      } else {
        res.json(nowPlaying);
      }
    })
    .catch((err) => {
      console.log("Error when retrieving song - ", err);
      if (err.statusCode === 401) {
        res.json({
          name: "Unauthorised access - sign in using Spotify again",
          albumArt: "",
          message: "Unauthorised access - sign in using Spotify again",
        });
      }
    });
});

async function getSongComments(id) {
  let comments;
  try {
    comments = await Comment.find({ songId: id });
    if (comments == null) {
      return { message: "Cannot find comments" };
    }
    return comments;
  } catch (err) {
    return { message: err.message };
  }
}

module.exports = router;
