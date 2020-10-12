const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");


router.get("/", (req, res, next) => {
  Item.find()
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/:id', async function(req, res, next) {
    try {
      const dbResponse = await Item.findById(req.params.id);
      res.status(200)
      res.json(dbResponse)
      
    } catch (error) {
      res.status(500)
      next(error)
    }
  });

  router.post('/', uploader.single("image"), async function(req, res, next) {
    try {
      const newItem = req.body;

      if (req.file) {
        newItem.profileImage = req.file.path;
      }

      const dbResponse = await Item.create(newItem);
      res.status(201)
      res.json(dbResponse)
      
    } catch (error) {
      res.status(500)
      next(error)
    }
  });

  router.patch('/:id', uploader.single("image"),async function(req, res, next) {
    try {

      const newItem = req.body;

      if (req.file) {
        newItem.profileImage = req.file.path;
      }
      const dbResponse = await Item.findByIdAndUpdate(req.params.id, newItem, {new : true});
      res.status(201)
      res.json(dbResponse)
      
    } catch (error) {
      res.status(500)
      next(error)
    }
  });

  router.delete('/:id', async function(req, res, next) {
    try {
      const dbResponse = await Item.findByIdAndDelete(req.params.id);
      res.status(201)
      res.json(dbResponse)
      
    } catch (error) {
      res.status(500)
      next(error)
    }
  });

  module.exports = router;
