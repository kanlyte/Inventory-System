const mongoose = require("mongoose");

//_id to id
const id = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
    },
  });
};

//seller
const SellerSchema = new mongoose.Schema({
  seller_name: {
    type: String,
  },
  seller_phone: {
    type: String,
  },
  seller_password: {
    type: String,
  },
  seller_date: {
    type: Date,
    default: Date.now,
  },
});
id(SellerSchema);
const Seller = new mongoose.model("sellers", SellerSchema);

// product
const ProductSchema = new mongoose.Schema({
  pdt_name: {
    type: String,
  },
  size: {
    type: String,
  },
  unit: {
    type: String,
  },
  batch_no: {
    type: String,
  },
  brand_name: {
    type: String,
  },
  purchase_date: {
    type: String,
  },
  manufacture_date: {
    type: String,
  },
  quantity: {
    type: String,
  },
  cost_price: {
    type: String,
  },
  selling_price: {
    type: String,
  },
  expiry_date: {
    type: String,
  },
  supplier: {
    type: String,
  },
  entry_date: {
    type: Date,
    default: Date.now(),
  },
});
id(ProductSchema);
const Product = new mongoose.model("products", ProductSchema);

module.exports = {
  Seller,
  Product,
};
