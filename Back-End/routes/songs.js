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

  let spotifyRes = await spotifyApi.getMyCurrentPlaybackState();
  if (spotifyRes) {
    nowPlaying = {
      id: spotifyRes.body.item.id,
      name: spotifyRes.body.item.name,
      albumArt: spotifyRes.body.item.album.images[0].url,
      previewURL: spotifyRes.body.item.preview_url,
      comments: [],
    };
    let comments = await getSongComments(spotifyRes.body.item.id);
    nowPlaying.comments = comments;

    res.json(nowPlaying);
  } else {
    res.json(nowPlaying);
  }
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
