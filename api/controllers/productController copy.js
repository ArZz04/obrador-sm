
const db = require('../db/db.js');

console.log("hi")

// RUTA PARA OBTENER TODOS LOS PRODUCTOS
// RUTA PARA OBTENER UN PRODUCTO POR ID
// RUTA PARA OBTENER PRODUCTOS POR FAMILIA
// RUTA PARA OBTENER PRODUCTOS POR SUBFAMILIA
// RUTA PARA OBTENER PRODUCTOS POR NOMBRE
// RUTA PARA CREAR UN PRODUCTO
// RUTA PARA ACTUALIZAR UN PRODUCTO
// RUTA PARA BORRAR UN PRODUCTO

// RUTA PARA OBTENER TODOS LOS PRODUCTOS
async function getProducts(req, res) {

    db.all('SELECT * FROM productss', (err, result) => {
        if (err) throw err;
        res.send(result);
      });

}

// RUTA PARA OBTENER UN PRODUCTO POR ID
async function getProductById(req, res) {
    const id = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';
    db.all(query, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
      });
}

// RUTA PARA OBTENER PRODUCTOS POR FAMILIA
async function getProductsByFamily(req, res) {
  try {
    const family = req.params.family;
    const query = 'SELECT * FROM products WHERE family = ?';
    db.all(query, [family], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor 2');
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor 1');
  }
}

// RUTA PARA OBTENER PRODUCTOS POR SUBFAMILIA
async function getProductsBySubfamily(req, res) {
    const subfamily = req.params.subfamily;
    const query = 'SELECT * FROM products WHERE subfamily = ?';
    db.all(query, [subfamily], (err, result) => {
        if (err) throw err;
        res.send(result);
      });
}

// ---- DISABLED -----
// RUTA PARA OBTENER PRODUCTOS POR NOMBRE
async function getProductByName(req, res) {
  const name = req.params.name;
  console.log("entro");
  const query = 'SELECT * FROM products WHERE name = ?';
  db.all(query, [name], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.send(result);
      }
  });
}

// RUTA PARA CREAR UN PRODUCTO
async function createProduct(req, res) {
  try {
    const { name, price, family, subfamily, active } = req.body;
    const lastmodified = new Date();
      const query = 'INSERT INTO products (name, price, family, subfamily, active, lastmodified) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(query, [name, price, family, subfamily, active, lastmodified], function (err) {
          if (err) {
              console.error(err);
              res.status(500).send('Error interno del servidor al crear el producto');
          } else {
              res.status(201).send('Producto creado exitosamente');
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor al procesar la solicitud');
  }
}

// RUTA PARA ACTUALIZAR UN PRODUCTO
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const lastmodified = new Date();
    const { name, price, family, subfamily, active } = req.body;

    // Verifica si el producto existe antes de intentar actualizarlo
    const existingProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existingProduct) {
      return res.status(404).send('Producto no encontrado');
    }

    // Realiza la actualización
    const query = 'UPDATE products SET name = ?, price = ?, family = ?, subfamily = ?, active = ?, lastmodified = ? WHERE id = ?';
    db.prepare(query).run(name, price, family, subfamily, active, lastmodified, id);

    // Devuelve el producto actualizado
    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al actualizar el producto');
  }
}


// RUTA PARA BORRAR UN PRODUCTO
async function deleteProduct(req, res) {
  try {
      const id = req.params.id;

      // Verifica si el producto existe antes de intentar eliminarlo
      const existingProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
      if (!existingProduct) {
          return res.status(404).send('Producto no encontrado');
      }

      // Realiza la eliminación
      const query = 'DELETE FROM products WHERE id = ?';
      db.prepare(query).run(id);

      res.status(204).send();  // Respuesta 204 (Sin contenido) indicando que la eliminación fue exitosa
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor al eliminar el producto');
  }
}

// RUTA PARA OBTENER UNA FAMILIA POR ID
async function getFamilyById(req, res) {
  const id = req.params.id;
  const query = 'SELECT * FROM families WHERE id = ?';
  db.all(query, [id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
}

async function getInfo(req, res) {
  try {
    const products = await getFProducts(); // Wait for the asynchronous function to complete
    console.log(products);
    const organizedData = await organizeProducts(products);
    console.log(organizedData);
    res.send(organizedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

function getFProducts() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function organizeProducts(products) {
  const organizedData = [];

  const productsByFamily = groupBy(products, 'family_id');

  // Usar Promise.all para esperar a todas las promesas antes de continuar
  const organizedFamilyData = await Promise.all(
    Object.keys(productsByFamily).map(async (familyId) => {
      const family = await getFamilyById(familyId);
      const subfamilies = await Promise.all(
        productsByFamily[familyId].map(async (subfamily) => {
          const productsInSubfamily = await getProductsBySubfamily(subfamily.id);
          return {
            id: subfamily.id,
            name: subfamily.name,
            products: productsInSubfamily.map((product) => product.name),
          };
        })
      );
      return {
        family: { id: familyId, name: family.name },
        subfamilies,
      };
    })
  );

  organizedData.push(...organizedFamilyData);

  return organizedData;
}

  
module.exports = { getProducts, getProductById, getProductsByFamily, getProductsBySubfamily, getProductByName, createProduct, updateProduct, deleteProduct, getInfo };