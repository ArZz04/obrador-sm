const selectFamily = document.getElementById('Family-select');
const selectSubfamily = document.getElementById('Subfamily-select');
const selectProduct = document.getElementById('ProductName-select');
const inputPrice = document.getElementById('price-input');


fetch('http://localhost:3000/api/products/info')
  .then(response => response.json())
  .then(data => {
    // Limpiar opciones existentes en el select de familia
    selectFamily.innerHTML = '<option value="">Seleccionar Familia</option>';

    // Llenar opciones del select de familia
    for (const familyId in data) {
      const family = data[familyId];
      const option = document.createElement('option');
      option.value = familyId;
      option.textContent = family.name;
      selectFamily.appendChild(option);
    }

    // Manejar cambio en el select de familia
    selectFamily.addEventListener('change', () => {
      const selectedFamilyId = selectFamily.value;
      const subfamilies = data[selectedFamilyId].subfamilies;

      // Limpiar opciones existentes en el select de subfamilia
      selectSubfamily.innerHTML = '<option value="">Seleccionar Subfamilia</option>';

      // Limpiar opciones existentes en el select de producto
      selectProduct.innerHTML = '<option value="">Seleccionar Producto</option>';

      // Llenar opciones del select de subfamilia
      for (const subfamilyId in subfamilies) {
        const subfamily = subfamilies[subfamilyId];
        const option = document.createElement('option');
        option.value = subfamilyId;
        option.textContent = subfamily.name;
        selectSubfamily.appendChild(option);
      }
    });

    // Manejar cambio en el select de subfamilia
    selectSubfamily.addEventListener('change', () => {
      const selectedFamilyId = selectFamily.value;
      const selectedSubfamilyId = selectSubfamily.value;
      const products = data[selectedFamilyId].subfamilies[selectedSubfamilyId].products;

      // Limpiar opciones existentes en el select de producto
      selectProduct.innerHTML = '<option value="">Seleccionar Producto</option>';

      // Llenar opciones del select de producto
      for (const product of products) {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        selectProduct.appendChild(option);
      }

      // Establecer el precio como placeholder
      const selectedProduct = products[0]; // Tomamos el primer producto como ejemplo
      if (selectedProduct) {
        inputPrice.placeholder = `Actual: ${selectedProduct.price}`;
      }
    });
  })
  .catch(error => console.error('Error al obtener datos de la API:', error));