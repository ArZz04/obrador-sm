
const db = require('../db/db.js');

async function getLastFamily() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT family_id, lastmodified  FROM products GROUP BY family_id ORDER BY MAX(lastmodified) DESC LIMIT 4`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function formattedDate(date_to_format) {

  const date = new Date(date_to_format);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  return (formattedDate);

}

async function lastFModified(req, res) {
    try {

        const lastModifyFamilies = await getLastFamily();

        for (let i = 0; i < lastModifyFamilies.length; i++) {
          lastModifyFamilies[i].lastmodified = await formattedDate(lastModifyFamilies[i].lastmodified);
        }

        res.status(200).json(lastModifyFamilies);
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener la última familia modificada');
    }
  }

module.exports = { lastFModified };