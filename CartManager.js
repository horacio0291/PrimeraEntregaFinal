const fs = require("fs");

class CartManager {
  carts;
  products;
  constructor(file) {
    this.carts = file;
    this.products = file;
  }

  async autoIncrementalId() {
    let data = await this.getCarts();
    if (data.length == 0) {
      return 1;
    } else {
      return data[data.length - 1].id + 1;
    }
  }

  async getCarts() {
    let carts = await fs.promises.readFile(this.carts, "utf-8");
    let objCart = JSON.parse(carts);
    return objCart;
  }

  async addCart(newCart) {
    newCart.id = await this.autoIncrementalId();
    let data = await this.getCarts();
    data.push(newCart);
    await fs.promises.writeFile(this.carts, JSON.stringify(data));
  }

  async getCartById(id) {
    let carts = await this.getCarts();
    return carts.find((cart) => cart.id == id);
  }

  async getProducts() {
    let products = await fs.promises.readFile(this.products, "utf-8");
    return products;
  }

  async addProductsToCart(pid, cid, product) {
    let carts = await this.getProducts();
    carts = JSON.parse(carts); //todos los carritos

    let cartValues = Object.values(carts[cid - 1]); //Devuelve el cart seleccionado por cid

    let cartProducts = cartValues[1]; //array de productos de un carrito determinado - [1] identifica al array de productos de un carrito

    let isInCart = cartProducts.find((prod) => prod.id == pid); // Ubica el producto por el parametro pid, Si no esta manda undefined

    if (isInCart) {
      isInCart.quantity++;
    } else {
      cartProducts.push(product);
    }

  
    let json = JSON.stringify(carts);
    fs.promises.writeFile(this.carts, json)

  }
}

module.exports = CartManager;
