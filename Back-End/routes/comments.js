const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");

// Getting a comment
router.get("/", getComment, async (req, res) => {
  let userInfo = await userInfo.find({ userId: req.query.userId });
  console.log(userInfo);
  let formattedComment = {
    ...res.comment,
    userName: userInfo.name,
    userImage: userInfo.image,
  };
  res.json(formattedComment);
});

// Creating a comment
router.post("/", async (req, res) => {
  let currentUserId = await getCurrentUserId();
  console.log("req.body", req.body);
  let commentData = {
    userId: currentUserId,
    text: req.body.text,
    songId: req.body.songId,
    dateTime: new Date().toLocaleString(),
    editDateTime: "",
    votes: 0,
  };
  console.log(commentData);
  const comment = new Comment(commentData);

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Updating a comment - liking it
router.patch("/vote", getComment, async (req, res) => {
  try {
    let currentUser = await spotifyApi.getMe();
    let currentUserId = currentUser.body.id;

    if (res.comment[0].votesUsers.includes(currentUserId)) {
      res.json({ message: "User already upvoted comment" });
    } else {
      const updatedComment = await Comment.findOneAndUpdate(
        {
          songId: res.comment[0].songId,
          dateTime: res.comment[0].dateTime,
          userId: res.comment[0].userId,
        },
        {
          votes: res.comment[0].votes + 1,
          votesUsers: [...res.comment[0].votesUsers, currentUserId],
        },
        { new: true }
      );
      // const updatedComment = await res.comment.save();
      res.json(updatedComment);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a comment
router.delete("/", getComment, async (req, res) => {
  try {
    await res.comment.remove();
    res.json({ message: "Deleted comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.find({
      songId: req.query.songId,
      dateTime: req.query.dateTime,
      userId: req.query.userId,
    });
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.comment = comment;
  next();
}

async function getCurrentUserId() {
  let spotifyRes = await spotifyApi.getMe();
  if (spotifyRes) {
    return spotifyRes.body.id;
  } else {
    return "";
  }
}

module.exports = router;
