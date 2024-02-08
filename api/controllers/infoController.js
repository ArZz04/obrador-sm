
const db = require('../db/db.js');

async function getFamilies() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM families', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getSubFamilies() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM subfamilies', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getProducts() {
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

async function getInfo(req, res) {
  try {
    const families = await getFamilies();
    const subfamilies = await getSubFamilies();
    const products = await getProducts();

    const familyMap = {};

    subfamilies.forEach(subfamily => {
      const familyId = subfamily.family_id;

      if (!familyMap[familyId]) {
        familyMap[familyId] = {
          id: familyId,
          name: families.find(family => family.id === familyId).name,
          subfamilies: {},
        };
      }

      const subfamilyId = subfamily.id;
      const productsForSubfamily = products.filter(product => product.subfamily_id === subfamilyId);

      familyMap[familyId].subfamilies[subfamilyId] = {
        id: subfamilyId,
        name: subfamily.name,
        products: productsForSubfamily,
      };
    });

    const formattedResult = Object.values(familyMap);

    res.send(formattedResult);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = { getInfo }; 