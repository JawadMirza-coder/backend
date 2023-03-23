var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Info = new Schema(
  {
    username: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Info", Info);
