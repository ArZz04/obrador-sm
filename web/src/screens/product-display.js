// API Module
const API_URLs = 'https://api-web.arzz.tech' || 'http://localhost:3000';
const API_URL = 'http://localhost:3000';

import { Product } from './Classes/Product.js';
import { Products } from './Classes/Products.js';
import { Screen } from './Classes/Screen.js';

const productsList = new Products();
const ScreenList = new Screen();

async function fetchProducts() {
    const url = `${API_URL}/api/products/all`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        const productsData = await response.json();

        // Crear instancias de la clase Product para cada objeto de producto
        const products = productsData.map(productData => {
            return new Product(
                productData.active,
                productData.family_id,
                productData.id,
                productData.lastmodified,
                productData.name,
                productData.price,
                productData.subfamily_id,
                productData.dots,
                productData.format
            );
        });
        // Agregar productos a la lista
        productsList.addProduct(products);

        return productsList;
    } catch (error) {
        throw new Error('Error al obtener datos de la API:', error);
    }
}


// Main Module
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await fetchProducts();

        //verificar cuantos '.list-index' hay en el documento
        const indexSpans = document.querySelectorAll('.list-index');

        console.log(indexSpans)
        const indexSpan = document.querySelector('.list-index');
        const indexText = indexSpan.textContent;
        const indexArray = JSON.parse(indexText);
        const productsByIds = products.getProductsByIds(indexArray[0], indexArray[1]);

        console.log('Productos:', productsByIds);

    } catch (error) {
        console.error('Error al mostrar los productos:', error);
    }
});
