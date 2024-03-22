const selectFamily = document.getElementById('Family-select');
const selectSubfamily = document.getElementById('Subfamily-select');
const selectProduct = document.getElementById('ProductName-select');
const inputPrice = document.getElementById('price-input');

const API_URL = 'https://api-web.arzz.tech' || 'http://localhost:5000';
const API_URLs = 'http://localhost:5000';

fetch(`${API_URLs}/api/products/info`)
  .then(response => response.json())
  .then(data => {
    selectFamily.innerHTML = '<option value="">Seleccionar Familia</option>';

    for (const familyId in data) {
      const family = data[familyId];
      const option = document.createElement('option');
      option.value = familyId;
      option.textContent = family.name;
      selectFamily.appendChild(option);
    }

    selectFamily.addEventListener('change', () => {
      const selectedFamilyId = selectFamily.value;
      const subfamilies = data[selectedFamilyId].subfamilies;

      selectSubfamily.innerHTML = '<option value="">Seleccionar Subfamilia</option>';

      selectProduct.innerHTML = '<option value="">Seleccionar Producto</option>';

      for (const subfamilyId in subfamilies) {
        const subfamily = subfamilies[subfamilyId];
        const option = document.createElement('option');
        option.value = subfamilyId;
        option.textContent = subfamily.name;
        selectSubfamily.appendChild(option);
      }
    });

    selectSubfamily.addEventListener('change', () => {
      const selectedFamilyId = selectFamily.value;
      const selectedSubfamilyId = selectSubfamily.value;
      const products = data[selectedFamilyId].subfamilies[selectedSubfamilyId].products;

      selectProduct.innerHTML = '<option value="">Seleccionar Producto</option>';

      for (const product of products) {
        const option = document.createElement('option');
        option.value = [product.id, product.price];
        option.textContent = product.name;
        selectProduct.appendChild(option);
      }

    
    });

    selectProduct.addEventListener('change', () => {
      const selectedProductId = selectProduct.value.split(',')[1];

        inputPrice.placeholder = `Actual: ${selectedProductId}`;
    });
  })
  .catch(error => console.error('Error al obtener datos de la API:', error));