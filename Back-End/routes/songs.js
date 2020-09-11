const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Comment = require("../models/comment");
const User = require("../models/user");

// Getting current song
router.get("/current", async function (req, res) {
  let nowPlaying = {
    songId: "",
  };

  spotifyApi
    .getMyCurrentPlaybackState()
    .then((response) => {
      if (response.body) {
        nowPlaying = {
          songId: response.body.item.id,
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

router.get("/", getSong, (req, res) => {
  res.json(res.song);
});

async function getSong(req, res, next) {
  console.log("HERE");
  let song;
  try {
    let songData = await spotifyApi.getTrack(req.body.id);
    song = {
      songId: songData.body.id,
      songName: songData.body.name,
      artistsName: songData.body.artists.map((artist) => artist.name),
      albumName: songData.body.album.name,
      albumArt: songData.body.album.images[0].url,
      previewURL: songData.body.preview_url,
      comments: [],
    };

    let songComments = await getSongComments(req.body.id);
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

    let userInfo;

    for (var i = 0; i < comments.length; i++) {
      userInfo = await User.find({ userId: comments[i].userId });
      comments[i] = {
        ...comments[i].toObject(),
        userName: userInfo[0].name,
        userImage: userInfo[0].image,
        userLink: userInfo[0].link,
      };
    }

    return comments;
  } catch (err) {
    return { message: err.message };
  }
}

module.exports = router;
