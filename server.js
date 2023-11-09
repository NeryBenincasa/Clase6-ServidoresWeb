const express = require('express');
const ProductManager = require('./app');

const app = express();
const PORT = 8080; 

const productManager = new ProductManager();

// Middleware para el manejo de JSON
app.use(express.json());

// Ruta para obtener todos los productos con límite opcional
app.get('/products', (req, res) => {
  const { limit } = req.query;
  let products = productManager.getProducts();

  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit)) {
      products = products.slice(0, parsedLimit);
    }
  }

  res.json(products);
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
