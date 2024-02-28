const selectFamily = document.getElementById('Family-select');
const selectSubfamily = document.getElementById('Subfamily-select');
const selectProduct = document.getElementById('ProductName-select');
const inputPrice = document.getElementById('price-input');


fetch('http://localhost:3000/api/products/info')
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
        option.value = product.id;
        option.textContent = product.name;
        selectProduct.appendChild(option);
      }

      const selectedProduct = products[0];
      if (selectedProduct) {
        inputPrice.placeholder = `Actual: ${selectedProduct.price}`;
      }
    });
  })
  .catch(error => console.error('Error al obtener datos de la API:', error));