const express = require("express");
const app = express();

const proudctsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", proudctsRouter);
app.use("/api/carts", cartsRouter);


const server = app.listen(8080, () =>
  console.log("Server listening on port 8080")
);
server.on("error", (err) => console.log("Server error: " + err));
