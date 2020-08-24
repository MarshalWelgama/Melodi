const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Comment = require("../models/comment");

// Getting current song
router.get("/current", async function (req, res) {
  let nowPlaying = {
    songName: "Nothing playing at the moment",
    albumArt: "",
  };

  spotifyApi
    .getMyCurrentPlaybackState()
    .then((response) => {
      console.log("response.body - ", response.body);
      if (response.body) {
        nowPlaying = {
          songId: response.body.item.id,
          songName: response.body.item.name,
          artistsName: response.body.item.artists,
          albumName: response.body.item.album.name,
          albumArt: response.body.item.album.images[0].url,
          previewURL: response.body.item.preview_url,
          comments: [],
        };
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

router.get("/:id", getSong, (req, res) => {
  res.json(res.song);
});

async function getSong(req, res, next) {
  let song;
  try {
    let songData = await spotifyApi.getTrack(req.params.id);
    song = {
      songId: songData.body.id,
      songName: songData.body.name,
      artistsName: songData.body.artists,
      albumName: songData.body.album.name,
      albumArt: songData.body.album.images[0].url,
      previewURL: songData.body.preview_url,
      comments: [],
    };

    let songComments = await getSongComments(req.params.id);

    if (songComments.message) {
      song.comments = [];
    } else {
      song.comments = songComments;
    }

    res.song = song;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

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
