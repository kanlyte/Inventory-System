const router = require("express").Router();

const { Seller } = require("../models/models");

// create Seller
router.post("/new/seller", async (req, res) => {
  const Seller_phone_check = await Seller.findOne({
    seller_phone: { $eq: req.body.seller_phone },
  });
  if (Seller_phone_check) {
    res.send({
      data: "seller exist",
      status: false,
    });
  } else {
    const seller = new Seller({
      seller_name: req.body.seller_name,
      seller_email: req.body.seller_email,
      seller_phone: req.body.seller_phone,
      seller_password: req.body.seller_password,
    });
    try {
      const save_Seller = await seller.save();
      res.send({
        status: true,
        data: "Seller added",
        result: save_Seller,
      });
    } catch (error) {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }
});

// delete a seller
router.delete("/delete/seller/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      const delete_Seller = await Seller.deleteOne({ _id: req.params.id });
      res.send({
        status: true,
        data: "seller deleted",
        result: delete_Seller,
      });
    } else {
      res.send({
        status: true,
        data: "seller not Found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});
//update a seller
router.put("/update/seller/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      const update_Seller = await Seller.updateOne(
        { _id: req.params.id },
        {
          $set: {
            seller_name: req.body.seller_name || update_Seller.seller_name,
            seller_phone: req.body.seller_phone || update_Seller.seller_phone,
            seller_password:
              req.body.seller_password || update_Seller.seller_password,
          },
        }
      );
      res.send({
        status: true,
        data: "seller updated",
        result: update_Seller,
      });
    } else {
      res.send({
        status: true,
        data: "seller not Found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

//get all sellers
router.get("/all/seller", async (req, res) => {
  const sellers = await Seller.find();
  try {
    if (sellers) {
      res.send({
        status: true,
        data: "sellers",
        result: sellers,
      });
    } else {
      res.send({
        status: true,
        data: "sellers not Found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
