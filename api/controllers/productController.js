const db = require('../db/db.js');

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

module.exports = { updateProduct };
