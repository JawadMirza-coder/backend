const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");
mongoose.set("debug", true);

var auth = require("../auth");

const Sales = require("../model/Sales");
const SalesRouter = express.Router();

SalesRouter.use(bodyParser.json());

SalesRouter.route("/")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Sales.find().then((sales) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(sales);
    });
  })
  .post(cors.cors, (req, res, next) => {
    req.body.user_id = mongoose.Types.ObjectId(req.body.user_id);
    Sales.create(req.body)
      .then((sales) => {
        Sales.find().then((sales) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          console.log(sales);
          res.json(sales);
        });
      })
      .catch((err) => console.log(err));
  });

SalesRouter.route("/:favId")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .patch(cors.cors, (req, res, next) => {
    console.log(req.body);
    Sales.findByIdAndUpdate(
      req.params.favId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((sales) => {
        Sales.findById(sales._id).then((sales) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(sales);
        });
      })
      .catch((err) => console.log(err));
  })

  .delete(cors.cors, (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.favId);
    console.log(req.body);
    Sales.findByIdAndRemove(id)
      .then((sales) => {
        Sales.findById(sales._id).then((Sales) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ meg: "Delete sales data" });
        });
      })
      .catch((err) => console.log(err));
  });

SalesRouter.route("/:favId")
  .options(cors.cors, (req, res) => {
    res.sendStatus(200);
  })
  .put(cors.cors, (req, res, next) => {
    Sales.findByIdAndUpdate(
      req.params.favId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((sales) => {
        Sales.findById(sales._id).then((sales) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(sales);
        });
      })
      .catch((err) => console.log(err));
  });

module.exports = SalesRouter;
