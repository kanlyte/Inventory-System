const mongoose = require("mongoose");
require("dotenv/config");

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB is running...");
    })
    .catch((err) => {
      console.log(err, "something is wrong somewhere");
    });
};

module.exports = ConnectDB;
