const router = require("express").Router();

const { Product } = require("../models/models");

//adding product
router.post("/new/product", async (req, res) => {
  const pdt_check = await Product.findOne({
    batch_no: { $eq: req.body.batch_no },
  });
  if (pdt_check) {
    res.send({
      data: "product exist",
      status: false,
    });
  } else {
    const product = new Product({
      pdt_name: req.body.pdt_name,
      size: req.body.size,
      batch_no: req.body.batch_no,
      unit: req.body.unit,
      brand_name: req.body.brand_name,
      purchase_date: req.body.purchase_date,
      manufacture_date: req.body.manufacture_date,
      quantity: req.body.quantity,
      cost_price: req.body.cost_price,
      selling_price: req.body.selling_price,
      expiry_date: req.body.expiry_date,
      supplier: req.body.supplier,
    });

    try {
      const save_pdt = await product.save();
      res.send({
        status: true,
        data: "product added",
        result: save_pdt,
      });
    } catch (error) {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }
});
//getting products
router.get("/all/products", async (req, res) => {
  const products = await Product.find();
  try {
    if (products) {
      res.send({
        data: "products",
        status: true,
        result: products,
      });
    } else {
      res.send({
        data: "No products found",
        status: false,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});
//deleting products
router.delete("/delete/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const delete_product = await Product.deleteOne({ _id: req.params.id });
      res.send({
        status: true,
        data: "product deleted",
        result: delete_product,
      });
    } else {
      res.send({
        status: true,
        data: "product not found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});
//updating products
router.put("/update/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    try {
      const update_product = await Product.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            pdt_name: req.body.pdt_name || update_product.pdt_name,
            size: req.body.size || update_product.size,
            batch_no: req.body.batch_no || update_product.batch_no,
            unit: req.body.unit || update_product.unit,
            brand_name: req.body.brand_name || update_product.brand_name,
            purchase_date: req.body.brand_name || update_product.brand_name,
            purchase_date:
              req.body.purchase_date || update_product.purchase_date,
            manufacture_date:
              req.body.manufacture_date || update_product.manufacture_date,
            quantity: req.body.quantity || update_product.quantity,
            cost_price: req.body.cost_price || update_product.cost_price,
            selling_price:
              req.body.selling_price || update_product.selling_price,
            expiry_date: req.body.expiry_date || update_product.expiry_date,
            supplier: req.body.supplier || update_product.supplier,
          },
        }
      );
      res.send({
        status: true,
        data: "product updated",
        result: update_product,
      });
    } catch (error) {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  } else {
    res.send({
      status: true,
      data: "product not Found",
    });
  }
});

//getting one product
router.get("/one/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const get_product = await Product.getOne({ _id: req.params.id });
      res.send({
        status: true,
        data: "product ",
        result: get_product,
      });
    } else {
      res.send({
        status: true,
        data: "product not found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
