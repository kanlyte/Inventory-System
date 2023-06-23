const router = require("express").Router();
const { Seller } = require("../models/models");

//login authentication
router.post("/login", async (req, res) => {
  if (req.body.tel === "0778089" && req.body.password === "12345") {
    res.send({ status: true, role: "admin", user: { username: "admin" } });
  } else {
    try {
      const seller = await Seller.findOne({
        $and: [
          { seller_phone: req.body.tel },
          {
            seller_password: req.body.password,
          },
        ],
      });
      seller
        ? res.send({
            user: seller,
            role: "employee",
            status: true,
          })
        : res.send({ status: false, data: "Wrong Details" });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        data: "An Error Occured",
      });
    }
  }
});

module.exports = router;
