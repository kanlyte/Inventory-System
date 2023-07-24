const router = require("express").Router();

const { Selling_unit } = require("../models/models");

// adding selling units
router.post("/new/unit", async (req, res) => {
  const unit_check = await Selling_unit.findOne({
    unit_name: { $eq: req.body.unit_name },
  });
  if (unit_check) {
    res.send({ data: "unit exists", status: false });
  } else {
    const unit = new Selling_unit({
      unit_name: req.body.unit_name,
    });
    try {
      const save_unit = await unit.save();
      res.send({
        status: true,
        data: "Unit saved successfully",
        result: save_unit,
      });
    } catch (error) {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }
});

// getting selling units by unit id,
router.get("/one/unit/:id", async (req, res) => {
  try {
    const unit = await Selling_unit.findById(req.params.id);
    if (unit) {
      const unit = await unit.findById({ _id: req.params.id });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

//getting all selling units
router.get("/all/units", async (req, res) => {
  const units = await Selling_unit.find();
  try {
    if (units) {
      res.send({
        data: "units",
        status: true,
        result: units,
      });
    } else {
      res.send({
        data: "selling units",
        status: false,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

module.exports = router;
