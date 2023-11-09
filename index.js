const ProductManager = require('./app'); // Importa la clase ProductManager
const productManager = new ProductManager(); // Crea una instancia de ProductManager

// Agrega productos a partir de los datos existentes en el archivo JSON
productManager.addProduct('Remera', 'Remera estampada de algodón', 20000, 'imagen1.jpg', 'r1', 10);
productManager.addProduct('Zapatilla', 'Air Max 97 have a day nike', 150000, 'imagen2.jpg', 'z1', 15);
productManager.addProduct('Pantalón', 'Nike', 50000, 'imagen3.jpg', 'p1', 7);

// Llama al método saveData para guardar los productos en el archivo JSON
productManager.saveData();

console.log('Productos agregados y guardados en products.json.');

