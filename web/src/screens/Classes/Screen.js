export class Screen {
    constructor() {
        this.products = [];
    }

    addProducts(products) {
        this.products.push(products);
    }

    static createSpan(className, textContent) {
        const span = document.createElement('span');
        span.classList.add(...className.split(' '));
        span.textContent = textContent;
        return span;
    }

    static renderProducts(products, divId) {
        // Obtener el div correspondiente al ID
        const div = document.getElementById(divId);
        console.log('Div:', div);

        // Verificar si el div existe
        if (!div) {
            console.error(`El div con ID ${divId} no existe.`);
            return;
        }

        // Limpiar el contenido del div antes de renderizar los productos
        div.innerHTML = '';

        // Iterar sobre los productos y renderizarlos
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('pcol-screen');

            const nameSpan = Screen.createSpan('pname text-black', `${product.name} `);
            const dotNumber = '.'.repeat(product.dots);
            const dotsSpan = Screen.createSpan('pdots text-green', dotNumber);
            const formatSpan = Screen.createSpan('pformat text-black', `${product.format}`);
            const priceSpan = Screen.createSpan('pprice text-black', ` $${product.price}`);

            productDiv.appendChild(nameSpan);
            productDiv.appendChild(dotsSpan);
            productDiv.appendChild(priceSpan);
            productDiv.appendChild(formatSpan);

            // Agregar el producto al div correspondiente
            div.appendChild(productDiv);
        });
    }

}
