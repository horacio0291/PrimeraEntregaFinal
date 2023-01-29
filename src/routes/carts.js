const { Router } = require("express");
const fs = require("fs");
const cartsRouter = Router();
const CartManager = require("../../CartManager");
const manager = new CartManager("./carts.json");
const products = new CartManager("./products.json");

let = newCart = { id: 0, products: [] };

cartsRouter.post("/add", async (req, res) => {
  await manager.addCart(newCart);
  res.send("Added Cart successfully");
});

cartsRouter.get("/:cid", async (req, res) => {
  let id = req.params.cid;
  let cartId = await manager.getCartById(id);
  if (!cartId) {
    res.send("404 - ID not found");
  } else {
    res.send(cartId.products);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let totalProducts = JSON.parse(await products.getProducts()); // Trae todos los productos de products.json
  let productId = totalProducts.find((prod) => prod.id == pid); // Identifico un productos en particular por el PID
  let newProduct = { id: productId.id, quantity: 1 }; // Producto para agregar al ccarrito

  await manager.addProductsToCart(pid, cid, newProduct);

  res.send(`Product added to cart`);
});

module.exports = cartsRouter;
