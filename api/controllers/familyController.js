
const db = require('../db/db.js');

// RUTA PARA OBTENER TODOS LOS FAMILIES
async function getFamilies(req, res) {

    db.all('SELECT * FROM families', (err, result) => {
        if (err) throw err;
        res.send(result);
      });

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

// RUTA PARA OBTENER FAMILIES POR NOMBRE
async function getFamilyByName(req, res) {
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
async function createFamily(req, res) {
  try {
    const { name } = req.body;
      const query = 'INSERT INTO products ( name ) VALUES ( ? )';
      db.run(query, [ name ], function (err) {
          if (err) {
              console.error(err);
              res.status(500).send('Error interno del servidor al crear el producto');
          } else {
              res.status(201).send('Familia creado exitosamente');
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor al procesar la solicitud');
  }
}
  
module.exports = { getFamilies, getFamilyById, getFamilyByName, createFamily };