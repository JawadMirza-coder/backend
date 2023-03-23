const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");
mongoose.set("debug", true);

var auth = require("../auth");

const Countries = require("../model/Countries");
const CountriesRouter = express.Router();

CountriesRouter.use(bodyParser.json());

CountriesRouter.route("/")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Countries.find()
      .then((country) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(country);
      });
  })
  .post(cors.cors, (req, res, next) => {
    Countries.create(req.body)
      .then((country) => {
        Countries.findById(country._id).then((country) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(country);
        });
      })
      .catch((err) => console.log(err));
  });

CountriesRouter.route("/:favId")
  .options(cors.cors, auth.verifyUser, (req, res) => {
    res.sendStatus(200);
  })
  .put(cors.cors, (req, res, next) => {
    Countries.findByIdAndUpdate(
      req.params.favId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((country) => {
        Countries.findById(country._id)
          .then((country) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(country);
          });
      })
      .catch((err) => console.log(err));
  })

  .delete(cors.cors, auth.verifyUser, (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.favId);
    Countries.findByIdAndRemove(id)
      .then((country) => {
        Countries.find()
          .then((Countries) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(Countries);
          });
      })
      .catch((err) => console.log(err));
  });

module.exports = CountriesRouter;
