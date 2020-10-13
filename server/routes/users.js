const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});


///api/users

router.patch('/me', uploader.single("profileImg"), async function(req, res, next) {
  const salt = 10;

  console.log(req.body.profileImg);

  try {
    let updateUser = req.body;
    if (req.file) {
      updateUser.profileImg = req.file.path;
      }

      if(req.body.password){
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        updateUser = {...updateUser, hashedPassword}
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
