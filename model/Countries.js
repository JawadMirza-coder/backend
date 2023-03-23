var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var Countries = new Schema(
  {
    name: {
      type: String,
    },
    cities: [{ id: { type: String }, name: { type: String } }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Countries", Countries);
