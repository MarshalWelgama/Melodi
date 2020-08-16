const express = require("express");
const router = express.Router();
const Song = require("../models/song");

// Getting all songs
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Getting current song
router.get("/current", function (req, res) {
  let nowPlaying = {
    name: "Nothing playing at the moment",
    albumArt: "",
  };

  spotifyApi
    .getMyCurrentPlaybackState()
    .then((response) => {
      if (response) {
        nowPlaying = {
          name: response.body.item.name,
          albumArt: response.body.item.album.images[0].url,
        };
      }
      res.json(nowPlaying);
    })
    .catch((error) => {
      res.json(error);
    });
});

// async function getUser(req, res, next) {
//   let user;
//   try {
//     user = await User.findById(req.params.id);
//     if (user == null) {
//       return res.status(404).json({ message: "Cannot find user" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.user = user;
//   next();
// }

module.exports = router;
