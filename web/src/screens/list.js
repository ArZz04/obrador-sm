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

function verifyFamily(indexSpans) {
    let family; // Declarar la variable family dentro de la función

    indexSpans.forEach((indexSpan, index) => {
        const indexText = indexSpan.textContent;
        const indexArray = JSON.parse(indexText);
        if (indexArray[0] == 1) {
            family = 'res';
        } else if (indexArray[0] == 2) {
            family = 'cerdo';
        } else if (indexArray[0] == 3) {
            family = 'pollo';
        } else if (indexArray[0] == 4) {
            family = 'marisco';
        }
    });

    return family; // Devolver la variable family
}


// Main Module
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await fetchProducts();
    
        const indexSpans = document.querySelectorAll('.list-index');
        const indexes = indexSpans.length;
        const productsArray = []

        // Iterar sobre cada elemento .list-index para filtrar los productos
        indexSpans.forEach((indexSpan, index) => {
            const indexText = indexSpan.textContent;
            const indexArray = JSON.parse(indexText);
            const productsByIds = products.getProductsByIds(indexArray[0], indexArray[1]);
            
            productsArray.push(productsByIds); 
        });

        // Obtener el valor de family
        const family = verifyFamily(indexSpans);

        // Crear la pantalla con los productos
        const screen = ScreenList.createScreen(indexes, family, productsArray);
        
        // Agregar la pantalla al cuerpo del documento
        document.body.appendChild(screen);

    } catch (error) {
        console.error('Error al mostrar los productos:', error);
    }
});