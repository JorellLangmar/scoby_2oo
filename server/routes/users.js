const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

///api/users

router.patch('/me', uploader.single("profileImg"), async (req, res, next) => {
  console.log(req.file, "<< before try" );
  try {
    let updateUser = req.body;
    if (req.file) {
      console.log("pouet pouet pouet")
      updateUser.profileImg = req.file.path;
      }
    const dbResponse = await User.findByIdAndUpdate(req.session.currentUser._id, updateUser, {new : true});
    res.status(201)
    res.json(dbResponse)
    
  } catch (error) {
    console.log(req.file, "<< dns le catch" );
    res.status(500)
    next(error)
  }
});

module.exports = router;
