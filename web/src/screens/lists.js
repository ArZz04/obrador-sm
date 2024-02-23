// Define las constantes para las URL de la API
const API_URL = 'https://api-web.arzz.tech'; // URL de la API en producción
const API_LOCAL_URL = 'http://localhost:5000'; // URL de la API en entorno local

async function fetchProducts(familyId, subfamilyId) {
    const url = `${API_LOCAL_URL}/api/products/families?familyId=${familyId}&subfamilyId=${subfamilyId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        const data = await response.json();
        console.log(data);
        // Maneja la respuesta de la API según sea necesario
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        // Maneja el error
    }
}

// Esta es la parte del código que ya tienes
const listContainer = document.querySelector('.list-prices');

async function displayProducts() {
    try {
        const indexSpan = document.querySelector('.list-index');
        const indexText = indexSpan.textContent; // Obtiene el contenido del span
        const indexArray = JSON.parse(indexText); // Convierte el texto JSON a un array

        const familyId = indexArray[0];
        const subfamilyId = indexArray[1];

        const response = await fetchProducts(familyId, subfamilyId); // Espera a que se resuelva la promesa
        listProducts = response.products;

        console.log('Products received:', response);

        if (Array.isArray(listProducts)) {
            listProducts.forEach(listProducts => {
                addProductToList(listProducts);
            });
        } else {
            console.error('Error: Products is not an array:', products);
        }
    } catch (error) {
        console.error('Error al mostrar los productos:', error);
    }
}

// Función para crear un elemento de producto y agregarlo al contenedor
function addProductToList(product) {
    // Crear elementos HTML
    const productDiv = document.createElement('div');
    productDiv.classList.add('pcol-Marisco');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('pname', 'text-black');
    nameSpan.textContent = product.name;

    const dotsSpan = document.createElement('span');
    dotsSpan.classList.add('pdots', 'text-green');
    dotsSpan.textContent = ' ..................................... ';

    const priceSpan = document.createElement('span');
    priceSpan.classList.add('pprice', 'text-black');
    priceSpan.textContent = `$${product.price}`;

    // Agregar los elementos al contenedor del producto
    productDiv.appendChild(nameSpan);
    productDiv.appendChild(dotsSpan);
    productDiv.appendChild(priceSpan);

    // Agregar el producto al contenedor principal
    listContainer.appendChild(productDiv);
}

// Llamar a la función displayProducts una vez que el DOM se haya cargado
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});