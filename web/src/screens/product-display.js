// API Module
const API_URLs = 'https://api-web.arzz.tech' || 'http://localhost:5000';
const API_URL = 'http://localhost:5000';

async function fetchProducts(familyId, subfamilyId) {
    const url = `${API_URL}/api/products/families?familyId=${familyId}&subfamilyId=${subfamilyId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Error al obtener datos de la API:', error);
    }
}

// UI Module
const listContainer = document.querySelector('.list-prices');

function displayProducts(products) {
    products.forEach(product => {
        addProductToList(product);
    });
}

function addProductToList(product) {
    const productDiv = createProductElement(product);
    listContainer.appendChild(productDiv);
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('pcol-screen');

    const nameSpan = createSpan('pname text-black', `${product.name} `);
    const dotNumber = '.'.repeat(product.dots);
    const dotsSpan = createSpan('pdots text-green', dotNumber);
    const formatSpan = createSpan('pformat text-black', `${product.format}`);
    const priceSpan = createSpan('pprice text-black', ` $${product.price}`);


    productDiv.appendChild(nameSpan);
    productDiv.appendChild(dotsSpan);
    productDiv.appendChild(priceSpan);
    productDiv.appendChild(formatSpan);

    return productDiv;
}

function createSpan(className, textContent) {
    const span = document.createElement('span');
    span.classList.add(...className.split(' '));
    span.textContent = textContent;
    return span;
}

// Main Module
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const indexSpan = document.querySelector('.list-index');
        const indexText = indexSpan.textContent;
        const indexArray = JSON.parse(indexText);

        if (Array.isArray(indexArray) && indexArray.length === 2) {
            const familyId = indexArray[0];
            const subfamilyId = indexArray[1];

            const response = await fetchProducts(familyId, subfamilyId);
            console.log('Response:', response);
            if (Array.isArray(response.products)) {
                console.log('Products:', response.products);
                displayProducts(response.products);
            } else {
                console.error('Error: Products is not an array:', response.products);
            }
        } else {
            console.error('Error: Invalid index format');
        }
    } catch (error) {
        console.error('Error al mostrar los productos:', error);
    }
});