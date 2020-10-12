const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch('/me', async function(req, res, next) {
  try {
    const updateUser = req.body;
    const dbResponse = await User.findByIdAndUpdate(req.session.currentUser._id, updateUser, {new : true});
    res.status(201)
    res.json(dbResponse)
    
  } catch (error) {
    res.status(500)
    next(error)
  }
});

module.exports = router;
