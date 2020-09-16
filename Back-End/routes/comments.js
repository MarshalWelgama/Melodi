const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");

// Getting a comment
router.get("/", getComment, async (req, res) => {
  try {
    let userInfo = await User.find({ userId: res.comment[0].userId });
    console.log(userInfo);
    let formattedComment;
    let formattedReplies = [];
    for (var i = 0; i < formattedComment.replies.length; i++) {
      let replyUserInfo = await User.find({
        userId: formattedComment.replies[i].userId,
      });
      formattedReplies[i] = {
        ...formattedComment.replies[i],
        userName: replyUserInfo[0].name,
        userImage: replyUserInfo[0].image,
        userLink: replyUserInfo[0].link,
      };
    }

    formattedComment = {
      ...formattedComment,
      userName: userInfo[0].name,
      userImage: userInfo[0].image,
      userLink: userInfo[0].link,
      replies: formattedReplies,
    };

    res.json(formattedComment);
  } catch (err) {
    res.json({ message: "Couldn't find comment" });
  }
});

// Creating a comment
router.post("/", async (req, res) => {
  let currentUserId = await getCurrentUserId();
  let commentData = {
    userId: currentUserId,
    text: req.body.text,
    songId: req.body.songId,
    editDateTime: "",
    votes: 0,
  };
  console.log(commentData);
  const comment = new Comment(commentData);
  console.log("MADE IT HERE");
  try {
    const newComment = await comment.save();
    console.log("AFTER SAVING");
    res.status(201).json(newComment);
  } catch (error) {
    console.log("CATCHED ERROR");
    res.status(400).json({ message: error.message });
  }
});

// Updating a comment - liking it
router.patch("/vote", getComment, async (req, res) => {
  try {
    let currentUserId = await getCurrentUserId();

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

// Updating a comment - replying to it
router.patch("/reply", getComment, async (req, res) => {
  try {
    let currentUserId = await getCurrentUserId();

    let commentReply = {
      userId: currentUserId,
      text: req.body.text,
      songId: res.comment[0].songId,
      editDateTime: "",
      votes: 0,
      level: 1,
    };
    const comment = new Comment(commentReply);

    try {
      const newComment = await comment.save();
      const updatedComment = await Comment.findOneAndUpdate(
        {
          songId: res.comment[0].songId,
          dateTime: res.comment[0].dateTime,
          userId: res.comment[0].userId,
        },
        {
          replies: [...res.comment[0].replies, newComment],
        },
        { new: true }
      );
      // const updatedComment = await res.comment.save();
      res.json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a comment
router.delete("/", getComment, async (req, res) => {
  try {
    await Comment.findOneAndDelete({
      songId: res.comment[0].songId,
      dateTime: res.comment[0].dateTime,
      userId: res.comment[0].userId,
    });
    res.json({ message: "Deleted comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.find({
      _id: req.body.id,
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
