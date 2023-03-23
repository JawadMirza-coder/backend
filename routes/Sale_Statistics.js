const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");
mongoose.set("debug", true);

var auth = require("../auth");

const Sale_Statistics = require("../model/Sale_Statistics");
const Sale_StatisticsRouter = express.Router();

Sale_StatisticsRouter.use(bodyParser.json());

Sale_StatisticsRouter.route("/")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Sale_Statistics.find().then((sales) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(sales[0]);
    });
  })
  .post(cors.cors, (req, res, next) => {
    Sale_Statistics.create(req.body)
      .then((sales) => {
        Sale_Statistics.findById(sales._id).then((sales) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(sales);
        });
      })
      .catch((err) => console.log(err));
  });

Sale_StatisticsRouter.route("/:favId")
  .options(cors.cors, auth.verifyUser, (req, res) => {
    res.sendStatus(200);
  })
  .put(cors.cors, (req, res, next) => {
    Sale_Statistics.findByIdAndUpdate(
      req.params.favId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((sales) => {
        Sale_Statistics.findById(sales._id).then((sales) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(sales);
        });
      })
      .catch((err) => console.log(err));
  })

  .delete(cors.cors, (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.favId);
    Sale_Statistics.findByIdAndRemove(id)
      .then((sales) => {
        Sale_Statistics.find().then((Sale_Statistics) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Sale_Statistics);
        });
      })
      .catch((err) => console.log(err));
  });

module.exports = Sale_StatisticsRouter;
