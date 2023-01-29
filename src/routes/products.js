const { Router } = require("express");

const proudctsRouter = Router();
const ProductManager = require("../../ProductManager");
const manager = new ProductManager("./products.json");

let product01 = {
  title: "Test Product 01",
  descripction: "Test Description 11",
  price: 1100,
  thumbnail: "No image available 11",
  code: 1123,
  stock: 11,
  status: true,
};

proudctsRouter.get("/", async (req, res) => {
  let { limit } = req.query;
  let products = await manager.getProducts();
  res.send(products.slice(0, limit));
});

proudctsRouter.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  let productId = await manager.getProdctById(id);
  if (!productId) {
    res.send("404 - ID not found");
  } else {
    res.send(productId);
  }
});

proudctsRouter.post("/add", async (req, res) => {
  await manager.addProduct(product01);
  res.send("Added product");
});

proudctsRouter.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  let update = req.body;
  let idNum = parseInt(id);
  await manager.updateProduct(idNum, update);
  res.send("updated product");
});

proudctsRouter.delete("/:pid", async (req, res) => {
  let id = req.params.pid;
  let idNum = parseInt(id);
  await manager.deleteProduct(idNum);
  res.send("Deleted Product")
});

module.exports = proudctsRouter;
