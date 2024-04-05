const db = require('../db/db.js');
const infoController = require('./infoController');
const allProducts = infoController.getProducts;

async function getProductsPerFamily(familyId, subfamilyId) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM products WHERE family_id = ? AND subfamily_id = ?`, [familyId, subfamilyId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

async function updateProduct(req, res) {
    try {
        const productId = req.params.productId; // Obtener el ID del producto de los parámetros de la URL
        const updatedData = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

        const newPrice = updatedData.price; // Obtener el nuevo precio del producto desde los datos actualizados
        const currentDate = new Date().toISOString(); // Obtener la fecha y hora actual

        // Ejecutar la consulta SQL de actualización para actualizar el precio y la fecha de última modificación
        db.prepare('UPDATE products SET price = ?, lastmodified = ? WHERE id = ?').run(newPrice, currentDate, productId);

        console.log(`Producto con ID ${productId} actualizado con éxito con un nuevo precio de ${newPrice}`);
        // Responder al cliente con un mensaje de éxito
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el producto' });
    }
}

async function getProducts(req, res) {
    try {
        const familyId = req.query.familyId;
        const subfamilyId = req.query.subfamilyId;

        console.log(`Producto con FamilyID: ${familyId} y subfamilia: ${subfamilyId}`);
        const products = await getProductsPerFamily(familyId, subfamilyId);
        res.status(200).json({ products: products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
    }
}



module.exports = { updateProduct, getProducts };
