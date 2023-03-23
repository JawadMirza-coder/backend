var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Sales = new Schema(
  {
    product: {
      type: String,
    },
    revenue: {
      type: String,
    },
    sales_number: {
      type: String,
    },
    date: {
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


module.exports = mongoose.model("Sales", Sales);
