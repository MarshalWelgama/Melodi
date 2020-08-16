const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Getting a comment
router.get("/:id", getComment, (req, res) => {
  res.json(res.comment);
});

// Creating a comment
router.post("/", async (req, res) => {
  const comment = new Comment({
    id: req.query.id,
    user: req.query.user,
    text: req.query.text,
    song: req.query.song,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Updating a comment - changing text or replying to it
router.patch("/:id", getComment, async (req, res) => {
  if (req.query.text != null) {
    res.comment.text = req.query.text;
  }

  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a comment
router.delete("/:id", getComment, async (req, res) => {
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
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.comment = comment;
  next();
}

module.exports = router;
