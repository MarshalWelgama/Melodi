const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting current user
router.get("/current", function (req, res) {
  let userData = {
    userId: "",
    name: "",
    email: "",
    countryCode: "",
    image: "",
    link: "",
  };

  spotifyApi
    .getMe()
    .then((response) => {
      if (response) {
        User.find({ userId: response.body.id }, function (err, docs) {
          if (docs.length > 0) {
            console.log(docs[0]);
            res.json(docs[0]);
          } else {
            userData = {
              userId: response.body.id,
              name: response.body.display_name,
              email: response.body.email,
              countryCode: response.body.country,
              image:
                response.body.images === [] ? "" : response.body.images[0].url,
              link: response.body.external_urls.spotify,
            };
            User.create(userData, function (err, docs) {
              if (err) {
                console.log(err);
              } else {
                res.json(docs);
              }
            });
          }
        });
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

// Getting one user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// // Creating a user
// router.post("/", async (req, res) => {
//   const user = new User({
//     id: req.query.id,
//     name: req.query.name,
//     email: req.query.email,
//     countryCode: req.query.countryCode,
//     image: req.query.image,
//     link: req.query.link,
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Updating a user
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.countryCode != null) {
    res.user.countryCode = req.body.countryCode;
  }
  if (req.body.image != null) {
    res.user.image = req.body.image;
  }
  if (req.body.link != null) {
    res.user.link = req.body.link;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a user
router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ userId: req.body.id });
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.find({ userId: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
