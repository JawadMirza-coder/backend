var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sale_statistics = new Schema(
  {
    average_sales_for_current_user: {
      type: String,
    },
    average_sale_all_user: {
      type: String,
    },
    highest_revenue_sale_for_current_user: {
        sale_id: { type: String },
        revenue: { type: String }
    },
    product_highest_revenue_for_current_user: {
        product_name: { type: String },
        price: { type: String }
    },
    product_highest_sales_number_for_current_user: {
        product_name: { type: String },
        price: { type: String }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sale_statistics", sale_statistics);
