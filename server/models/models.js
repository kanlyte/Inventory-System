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
  seller_email: {
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
  product_units: {
    type: String,
  },
  product_date: {
    type: String,
  },
  product_re_order: {
    type: Number,
  },
  product_unit: {
    type: String,
  },
  pdt_desc: {
    type: String,
  },
});
id(ProductSchema);
const Product = new mongoose.model("products", ProductSchema);

// product-purchase
const ProductPurchaseSchema = new mongoose.Schema({
  products_purchased: {
    type: String,
  },
  purchase_discount: {
    type: Number,
  },
  purchase_amount: {
    type: Number,
  },
  purchase_t_amount: {
    type: Number,
  },
  purchase_made_by: {
    type: String,
  },
  purchase_date: {
    type: String,
  },
});
id(ProductPurchaseSchema);
const Product_purchase = new mongoose.model(
  "product_purchases",
  ProductPurchaseSchema
);

// product-sale
const ProductSaleSchema = new mongoose.Schema({
  products_sold: {
    type: String,
  },
  sales_amount: {
    type: Number,
  },
  sales_discount: {
    type: Number,
  },
  amount_paid: {
    type: Number,
  },
  sale_made_by: {
    type: String,
  },
  customer_id: {
    type: Date,
  },
  sales_date: {
    type: String,
  },
});
id(ProductSaleSchema);
const Product_sale = new mongoose.model("product_sales", ProductSaleSchema);

//Supplier-----------------
const SupplierSchema = new mongoose.Schema({
  supplier_surname: {
    type: String,
  },
  supplier_lastname: {
    type: String,
  },
  supplier_contact: {
    type: Number,
  },
  supplier_location: {
    type: String,
  },
  purchase_date: {
    type: Date,
  },
});
id(SupplierSchema);
const Supplier = new mongoose.model("suppliers", SupplierSchema);

//Batch number-----------------
const BatchSchema = new mongoose.Schema({
  batch_id: {
    type: String,
  },
  product_id: {
    type: String,
  },
  batch_no: {
    type: Number,
  },
  batch_qty: {
    type: Number,
  },
  batch_expiry_date: {
    type: String,
  },
});
id(BatchSchema);
const Batch = new mongoose.model("batches", BatchSchema);

//selling unit model
const SellingUnitSchema = new mongoose.Schema({
  unit_name: {
    type: String,
  },
});
id(SellingUnitSchema);
const Selling_unit = new mongoose.model("selling_unit", SellingUnitSchema);

module.exports = {
  Seller,
  Product,
  Selling_unit,
  Product_purchase,
  Supplier,
  Product_sale,
  Batch,
};
