const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");

Date.prototype.customFormat = function (formatString) {
  var YYYY,
    YY,
    MMMM,
    MMM,
    MM,
    M,
    DDDD,
    DDD,
    DD,
    D,
    hhhh,
    hhh,
    hh,
    h,
    mm,
    m,
    ss,
    s,
    ampm,
    AMPM,
    dMod,
    th;
  YY = ((YYYY = this.getFullYear()) + "").slice(-2);
  MM = (M = this.getMonth() + 1) < 10 ? "0" + M : M;
  MMM = (MMMM = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][M - 1]).substring(0, 3);
  DD = (D = this.getDate()) < 10 ? "0" + D : D;
  DDD = (DDDD = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][this.getDay()]).substring(0, 3);
  th =
    D >= 10 && D <= 20
      ? "th"
      : (dMod = D % 10) == 1
      ? "st"
      : dMod == 2
      ? "nd"
      : dMod == 3
      ? "rd"
      : "th";
  formatString = formatString
    .replace("#YYYY#", YYYY)
    .replace("#YY#", YY)
    .replace("#MMMM#", MMMM)
    .replace("#MMM#", MMM)
    .replace("#MM#", MM)
    .replace("#M#", M)
    .replace("#DDDD#", DDDD)
    .replace("#DDD#", DDD)
    .replace("#DD#", DD)
    .replace("#D#", D)
    .replace("#th#", th);
  h = hhh = this.getHours();
  if (h == 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? "0" + h : h;
  hhhh = hhh < 10 ? "0" + hhh : hhh;
  AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
  mm = (m = this.getMinutes()) < 10 ? "0" + m : m;
  ss = (s = this.getSeconds()) < 10 ? "0" + s : s;
  return formatString
    .replace("#hhhh#", hhhh)
    .replace("#hhh#", hhh)
    .replace("#hh#", hh)
    .replace("#h#", h)
    .replace("#mm#", mm)
    .replace("#m#", m)
    .replace("#ss#", ss)
    .replace("#s#", s)
    .replace("#ampm#", ampm)
    .replace("#AMPM#", AMPM);
};

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

// Getting recent comments
router.get("/recent", async (req, res) => {
  let numResults = parseInt(req.query.numResults);
  if (!numResults) {
    numResults = 5;
  }
  let comments = await Comment.find().sort({ _id: -1 }).limit(numResults);
  let formattedComments = [];
  for (var i = 0; i < comments.length; i++) {
    let userInfo = await User.find({ userId: comments[i].userId });
    let songInfo = await spotifyApi.getTrack(comments[i].songId);

    let formattedComment = {
      ...comments[i].toObject(),
      userName: userInfo.name,
      userImage: userInfo.image,
      userLink: userInfo.link,
      songName: songInfo.body.name,
      artists: songInfo.body.artists.map((artist) => artist.name),
      albumArt: songInfo.body.album.images[0].url,
    };

    formattedComments.push(formattedComment);
  }

  res.json(formattedComments);
});

// Getting top comments
router.get("/top", async (req, res) => {
  let numResults = parseInt(req.query.numResults);
  if (!numResults) {
    numResults = 5;
  }
  let comments = await Comment.find().sort({ votes: -1 }).limit(numResults);
  let formattedComments = [];
  for (var i = 0; i < comments.length; i++) {
    let userInfo = await User.find({ userId: comments[i].userId });
    let songInfo = await spotifyApi.getTrack(comments[i].songId);


    let formattedComment = {
      ...comments[i].toObject(),
      userName: userInfo[0].name,
      userImage: userInfo[0].image,
      userLink: userInfo[0].link,
      songName: songInfo.body.name,
      artists: songInfo.body.artists.map((artist) => artist.name),
      albumArt: songInfo.body.album.images[0].url,
    };

    formattedComments.push(formattedComment);
  }

  res.json(formattedComments);
});

// Creating a comment
router.post("/", async (req, res) => {
  let currentUserId = await getCurrentUserId();
  let commentData = {
    userId: currentUserId,
    text: req.body.text,
    songId: req.body.songId,
    formattedDateTime: new Date().customFormat(
      "#DD# #MMMM# #YYYY# #hh#:#mm# #AMPM#"
    ),
    editDateTime: "",
    votes: 0,
  };
  console.log("commentData", commentData);
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
      formattedDateTime: new Date().customFormat(
        "#DD# #MMMM# #YYYY# #hh#:#mm# #AMPM#"
      ),
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
