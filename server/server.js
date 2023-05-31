const express = require("express");
const server = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const db = require("../server/database/db");
// middlewares
server.use(cors());
server.use(express.json());
/*
Default route
*/
server.get("/", (req, res) => {
  res.send("Can you gently find your way out of here?");
});
//other routes
server.use("/api/", require("./api/seller"));
server.use("/api/", require("./api/product"));
server.use("/api/", require("./api/auth"));

//db connect
db();
server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

// logoin for admin and seller
// adding seller by admin   edit, delete  getting seller
// adding a product by the user edit delete displaying all products
// pdt name, brand name, purchase date, munifacture date, quantity, cost price, selling price, expiry date, supplier
