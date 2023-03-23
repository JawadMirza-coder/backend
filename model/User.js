var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var User = new Schema(
  {
    email: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

User.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("User", User);
