const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});


///api/users

router.patch('/me', uploader.single("profileImg"), async function(req, res, next) {
  console.log(req.body);
  console.log(req.session.currentUser._id); 
  try {
    const updateUser = req.body;
    if (req.file) {
      updateUser.profileImg = req.file.path;
      }
    
    const dbResponse = await User.findByIdAndUpdate(req.session.currentUser._id, updateUser, {new : true});
    res.status(201)
    res.json(dbResponse)
    
  } catch (error) {
    res.status(500)
    next(error)
  }
});

module.exports = router;
