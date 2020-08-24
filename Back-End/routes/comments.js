const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Getting a comment
router.get("/", getComment, (req, res) => {
  res.json(res.comment);
});

// Creating a comment
router.post("/", async (req, res) => {
  let currentUserId = await getCurrentUserId();
  console.log(req.query);
  let commentData = {
    userId: currentUserId,
    text: req.query.text,
    songId: req.query.songId,
    dateTime: new Date().toLocaleString(),
    editDateTime: "",
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

// Updating a comment - changing text or liking it
router.patch("/", getComment, async (req, res) => {
  if (req.query.text != null) {
    res.comment.text = req.query.text;
    res.comment.editDateTime = new Date().toLocaleString();
  }

  if (req.query.votes != null) {
    res.comment.votes += 1;
  }

  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
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
