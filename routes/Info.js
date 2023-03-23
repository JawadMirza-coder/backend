const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");
mongoose.set("debug", true);

var auth = require("../auth");

const Info = require("../model/Info");
const InfoRouter = express.Router();

InfoRouter.use(bodyParser.json());

InfoRouter.route("/:userId")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Info.find({user_id:req.params.userId}).then((info) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(info);
    });
  })
  .post(cors.cors, (req, res, next) => {
    req.body.user_id = mongoose.Types.ObjectId(req.params.userId);
    Info.create(req.body)
      .then((info) => {
        Info.findById(info._id).then((info) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(info);
        });
      })
      .catch((err) => console.log(err));
  });

InfoRouter.route("/:userId")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .patch(cors.cors, (req, res, next) => {
    Info.findOneAndUpdate(
      { User: req.params.userId },
      {
        $set: req.body,
      }
    )
      .then((info) => {
        Info.findById(info._id).then((info) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(info);
        });
      })
      .catch((err) => console.log(err));
  })

  .delete(cors.cors, (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.userId);
    Info.findByIdAndRemove(id)
      .then((info) => {
        Info.find().then((info) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(info);
        });
      })
      .catch((err) => console.log(err));
  });

module.exports = InfoRouter;
