const ProductManager = require('./app');

// 1. Crea una instancia de la clase ProductManager
const productManager = new ProductManager();

// 2. Llama a getProducts recién creada la instancia
const productsBefore = productManager.getProducts();
console.log('Productos antes de agregar:', productsBefore);

// 3. Llama al método addProduct con los campos proporcionados
try {
    const product1 = productManager.addProduct(
      'producto prueba',
      'Este es un producto prueba',
      200,
      'Sin imagen',
      'abc123',
      25
    );
    console.log('Producto agregado:', product1);
  
    // 4. Llama a getProducts nuevamente para verificar que el producto se haya agregado
    const productsAfter = productManager.getProducts();
    console.log('Productos después de agregar:', productsAfter);
  
    // 5. Llama al método getProductById con el ID del producto agregado
    const productIdToFind = product1.id;
    const foundProduct = productManager.getProductById(productIdToFind);
    console.log('Producto encontrado por ID:', foundProduct);
  
    // 6. Intenta actualizar un campo de algún producto
    if (foundProduct) {
      foundProduct.title = 'Nuevo título';
      productManager.updateProduct(foundProduct.id, foundProduct);
      console.log('Producto actualizado:', foundProduct);
    }
  
    // 7. Elimina un producto
    const productIdToDelete = product1.id;
    productManager.deleteProduct(productIdToDelete);
    console.log('Producto eliminado con ID:', productIdToDelete);
  } catch (error) {
    console.error('Error:', error.message);
  }
  