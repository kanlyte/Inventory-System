const router = require("express").Router();
const { nanoid } = require("nanoid");
const {
  Product,
  Product_purchase,
  Supplier,
  Product_sale,
  Batch,
} = require("../models/models");

//adding product logic
router.post("/new/product", async (req, res) => {
  let { pdt_name, pdt_desc, units, date, re_order_qty, re_order_unit } =
    req.body;
  let units_arr = [];
  for (let i = 0; i < units.length; i++) {
    let unit = units[i];
    if (unit.qty && unit.selling_unit) {
      if (i === 0) {
        units_arr.push(unit);
      } else {
        unit.qty = parseInt(units_arr[i - 1].qty) * parseInt(units[i].qty);
        units_arr.push(unit);
      }
    }
  }
  const pdt_check = await Product.findOne({
    pdt_name: { $eq: pdt_name },
  });
  if (pdt_check) {
    res.send({
      data: "product exist",
      status: false,
    });
  } else {
    const product = new Product({
      pdt_name: pdt_name,
      pdt_desc: req.body.pdt_desc,
      product_units: JSON.stringify(units_arr),
      product_date: date,
      product_unit: re_order_unit,
      product_re_order:
        parseInt(re_order_qty) * units_arr[units_arr.length - 1].qty || 0,
    });

    try {
      const save_pdt = await product.save();
      res.send({
        status: true,
        data: "product added Successfully",
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
        // data: "products",
        // status: true,
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
  let { pdt_name, pdt_desc, units, date, re_order_qty, re_order_unit } =
    req.body;
  let units_arr = [];
  for (let i = 0; i < units.length; i++) {
    let unit = units[i];
    if (unit.qty && unit.selling_unit) {
      if (i === 0) {
        units_arr.push(unit);
      } else {
        unit.qty = parseInt(units_arr[i - 1].qty) * parseInt(units[i].qty);
        units_arr.push(unit);
      }
    }
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    try {
      const update_product = await Product.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            pdt_name: pdt_name,
            pdt_desc: req.body.pdt_desc,
            product_units: JSON.stringify(units_arr),
            product_unit: re_order_unit,
            product_re_order:
              parseInt(re_order_qty) * units_arr[units_arr.length - 1].qty || 0,
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
      const get_product = await Product.findById({ _id: req.params.id });
      res.send({
        status: true,
        data: "product ",
        result: get_product,
      });
    } else {
      res.send({
        status: false,
        data: "product not found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

//logic for purchasing product---------
router.post("/new_purchase", async (req, res) => {
  let { total_amount, discount, pay_amount, products_purchased, date, user } =
    req.body;
  const product = new Product_purchase({
    products_purchased: JSON.stringify(products_purchased),
    purchase_discount: parseFloat(discount) || 0,
    purchase_amount: parseFloat(pay_amount),
    purchase_t_amount: parseFloat(total_amount),
    purchase_made_by: user,
    purchase_date: date,
  });
  try {
    const save_purchase = await product.save();
    res.send({
      status: true,
      data: "Product Purchased Successfully",
      result: save_purchase,
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

// router.post("/new_purchase", async (req, res) => {
//   try {
//     let { total_amount, discount, pay_amount, products_purchased, date, user } =
//       req.body;

//     const processedProducts = [];

//     for (const e of products_purchased) {
//       const productId = e.product_id;
//       const product = await Product.findOne({ _id: productId });

//       if (!product) {
//         return res.send({ data: "Product not found", status: false });
//       }

//       const units = JSON.parse(product.product_units);
//       const sellingUnit = e.selling_unit;

//       let qty;
//       if (units[0].selling_unit === sellingUnit) {
//         qty = parseInt(e.qty) + product.product_qty;
//       } else {
//         const unitQty =
//           parseInt(units.find((i) => i.selling_unit === sellingUnit).qty) *
//           parseInt(e.qty);
//         qty = parseInt(product.product_qty) + unitQty;
//       }

//       await Product.updateOne(
//         { _id: productId },
//         { $set: { product_qty: qty } }
//       );

//       const batchId = nanoid(6);
//       const existingBatch = await Batch.findOne({ batch_id: batchId });

//       if (!existingBatch) {
//         await Batch.create({
//           batch_id: batchId,
//           product_id: productId,
//           batch_no: e.batch_no,
//           batch_qty: qty,
//           batch_expiry_date: e.expiry_date,
//         });
//       } else {
//         await Batch.create({
//           batch_id: nanoid(6),
//           product_id: productId,
//           batch_no: e.batch_no,
//           batch_qty: qty,
//           batch_expiry_date: e.expiry_date,
//         });
//       }

//       processedProducts.push({
//         product_id: productId,
//         batch_no: e.batch_no,
//         batch_qty: qty,
//         batch_expiry_date: e.expiry_date,
//       });
//     }

//     const purchaseData = {
//       products_purchased: processedProducts,
//       purchase_discount: parseFloat(discount) || 0,
//       purchase_amount: parseFloat(pay_amount),
//       purchase_t_amount: parseFloat(total_amount),
//       purchase_made_by: user,
//       purchase_date: date,
//     };

//     await Product_purchase.create(purchaseData);

//     res.send({ data: "Purchase Finished Successfully", status: true });
//   } catch (err) {
//     console.log(err);
//     res.send({ data: "An Error Occured", status: false });
//   }
// });

//logic for selling the products--------------------------------
router.post("/new_sale", async (req, res) => {
  let {
    total_amount,
    discount,
    pay_amount,
    products_sold,
    date,
    user,
    customer,
  } = req.body;
  const products = new Product_sale({
    products_sold: JSON.stringify(products_sold),
    sales_amount: parseFloat(total_amount),
    sales_discount: parseFloat(discount) || 0,
    amount_paid: parseFloat(pay_amount),
    sales_date: date,
    sale_made_by: user,
    customer_id: customer || "",
  });
  try {
    const save_sale = await products.save();
    res.send({
      status: true,
      data: "Sale Completed Successfully.",
      result: save_sale,
    });
  } catch (error) {
    res.send({
      status: false,
      data: "An  Error Occured.Refresh And Try Again",
      result: error,
    });
  }
});

//new-supplier---------------
router.post("/new_supplier", async (req, res) => {
  let {
    supplier_surname,
    supplier_lastname,
    supplier_contact,
    supplier_location,
    date,
  } = req.body;
  const sup_check = await Supplier.findOne({
    supplier_contact: { $eq: supplier_contact },
  });
  if (sup_check) {
    res.send({
      data: "Supplier exist",
      status: false,
    });
  } else {
    const supplier = new Supplier({
      supplier_surname: supplier_surname,
      supplier_lastname: supplier_lastname,
      supplier_contact: supplier_contact,
      supplier_location: supplier_location,
      date_registered: date,
    });
    try {
      const save_supplier = await supplier.save();
      res.send({
        status: true,
        data: "Supplier added Successfully",
        result: save_supplier,
      });
    } catch (error) {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }
});

//getting suppliers
router.get("/all/suppliers", async (req, res) => {
  const suppliers = await Supplier.find();
  try {
    if (suppliers) {
      res.send({
        data: "suppliers",
        status: true,
        result: suppliers,
      });
    } else {
      res.send({
        data: "No suppliers found",
        status: false,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});
//seach products from the database----------
router.get("/search/:key", async (req, res) => {
  let data = await Product.find({
    $or: [{ pdt_name: { $regex: req.params.key } }],
  });
  try {
    if (data) {
      res.send({
        data: "products",
        status: true,
        result: data,
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
//gets all the purchases----------------
router.get("/purchases", async (req, res) => {
  const purchases = await Product_purchase.find();
  try {
    if (purchases) {
      res.send({
        data: "purchases",
        status: true,
        result: purchases,
      });
    } else {
      res.send({
        data: "No purchases found",
        status: false,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});
//Gets all the sales made in the database-----------------------
router.get("/sales", async (req, res) => {
  const sales = await Product_sale.find();
  try {
    if (sales) {
      res.send({
        data: "sales",
        status: true,
        result: sales,
      });
    } else {
      res.send({
        data: "No Sales found",
        status: false,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});
module.exports = router;
