const fs = require("fs");

class ProducManager {
  products;
  constructor(file) {
    this.products = file;
  }

  async autoIncrementalId() {
    let data = await this.getProducts();
    if (data.length == 0) {
      return 1;
    } else {
      return data[data.length - 1].id + 1;
    }
  }

  async addProduct(newProduct) {
    newProduct.id = await this.autoIncrementalId();
    let data = await this.getProducts();
    data.push(newProduct);
    await fs.promises.writeFile(this.products, JSON.stringify(data));
  }

  async getProducts() {
    let products = await fs.promises.readFile(this.products, "utf-8");
    let objProduc = JSON.parse(products);
    return objProduc;
  }

  async getProdctById(id) {
    let products = await this.getProducts();
    return products.find((product) => product.id == id);
  }

  async updateProduct(id, update) {
    let products = await this.getProducts();
    let position = products.findIndex((product) => product.id === id);
    update.id = id;
    products.splice(position, 1, update);
    await fs.promises.writeFile(this.products, JSON.stringify(products));
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    let position = products.findIndex((product) => product.id === id);
    products.splice(position, 1);
    await fs.promises.writeFile(this.products, JSON.stringify(products));
  }
}

module.exports = ProducManager;
