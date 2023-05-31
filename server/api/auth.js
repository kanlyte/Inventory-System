const router = require("express").Router();
const { Seller } = require("../models/models");

//login authentication
router.post("/auth", async (req, res) => {
  try {
    if (req.body.name === "Admin" && req.body.password === "1234") {
      res.send({
        status: true,
        role: "admin",
        user: { username: "admin" },
      });
    } else {
      try {
        const seller = await Seller.findOne({
          $and: [
            { seller_name: req.body.seller_name },
            { seller_password: req.body.seller_password },
          ],
        });
        seller
          ? res.send({
              user: seller,
              role: "employee",
              status: true,
            })
          : res.send({
              data: "wrong details",
              status: false,
            });
      } catch (error) {
        res.send({
          status: false,
          data: "An Error Occured",
        });
      }
    }
  } catch (error) {
    res.send({
      status: false,
      data: "Un Expected Error",
    });
  }
});

module.exports = router;
