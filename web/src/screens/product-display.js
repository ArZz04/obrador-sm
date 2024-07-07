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

function createDivs(count, family, content) {
    const main = document.querySelector('main');
    const divsArray = []; // Array para almacenar los divs creados
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.id = `p${i}`;
        div.classList.add(`divScreen`, 'static', 'bg-red-400');
        div.innerHTML = `
            <div id="content${i}">${content}</div>
            <div class="absolute title${i}">
                <img class="z-10" src="./resources/r-${family}/P${i}/LINEA_NOMBRE.png">
            </div>
        `;
        main.appendChild(div);
        divsArray.push(div); // Agregar el div al array
    }
    return divsArray; // Devolver el array de divs
}

// Main Module
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await fetchProducts();

        // Obtener la cantidad de elementos .list-index en el documento
        const indexSpans = document.querySelectorAll('.list-index');
        const divsCount = indexSpans.length;
        const divsGeneratedAll = [];

        // Crear los divs fuera del bucle forEach
        var family = '';
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
        

        // Iterar sobre cada elemento .list-index y renderizar los productos correspondientes
        indexSpans.forEach((indexSpan, index) => {
            const indexText = indexSpan.textContent;
            const indexArray = JSON.parse(indexText);
            const productsByIds = products.getProductsByIds(indexArray[0], indexArray[1]);
            // Llamar al método renderProducts para el div correspondiente
            const divsGenerated = Screen.renderProducts(productsByIds, `content${indexArray[2]}`);
            divsGeneratedAll.push(divsGenerated);
        });

        console.log('Divs generados:', divsGeneratedAll);
        const contents = document.querySelectorAll('.divScreen');
        // Iterar sobre cada elemento y agregarlo a la lista divs
        contents.forEach(div => {
            ScreenList.addDiv(div);
        });

        // Crear los divs después de determinar el valor de family
        const x = createDivs(divsCount, family, ScreenList.divs[0]);
        
        console.log('Divs:', x);
        // Llamar al método changeContent

    } catch (error) {
        console.error('Error al mostrar los productos:', error);
    }
});