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
  console.log(req.body.password);
  console.log(req.session.currentUser._id); 
  const salt = 10;
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
