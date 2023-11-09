const fs = require('fs');

class ProductManager {
  constructor(dataPath) {
    this.products = [];
    this.productIdCounter = 1;
    this.dataFile = 'products.json';
    this.path = dataPath || '';

    if (this.path) {
      this.dataFile = `${this.path}/${this.dataFile}`;
    }

    this.loadData();
  }

  loadData() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        this.productIdCounter = Math.max(...this.products.map(product => product.id)) + 1;
      }
    } catch (error) {
      console.log('No se encontraron datos existentes. Se creará un nuevo archivo.');
      this.saveData();
    }
  }

  saveData() {
    const dataToSave = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.dataFile, dataToSave);
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios.');
    }

    const existingProduct = this.products.find(product => product.code === code);

    if (existingProduct) {
      // Si el código ya existe, actualiza el producto existente en lugar de lanzar un error
      existingProduct.title = title;
      existingProduct.description = description;
      existingProduct.price = price;
      existingProduct.thumbnail = thumbnail;
      existingProduct.stock = stock;
      this.saveData(); // Guarda los cambios
      return existingProduct;
    }

    const product = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(product);
    this.saveData();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Producto no encontrado.');
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      // Clona el producto existente y fusionar los campos actualizados
      const updatedProduct = { ...this.products[productIndex], ...updatedFields };
      this.products[productIndex] = updatedProduct;
      this.saveData(); // Guarda los cambios
      return updatedProduct;
    } else {
      throw new Error('Producto no encontrado.');
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1); // Elimina el producto del array
      this.saveData(); // Guarda los cambios
      return true; // Indica que el producto se eliminó con éxito
    } else {
      throw new Error('Producto no encontrado.');
    }
  }
}

module.exports = ProductManager;
