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

    static createProduct(product) {
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
    
        return productDiv;
    }

    static createProductsDiv(products) {
        const productsContainer = document.createElement('div');
    
        products.forEach(product => {
            const productDiv = Screen.createProduct(product);
            productsContainer.appendChild(productDiv);
        });
        
        return productsContainer;
    }

    createScreen(indexes, family, content) {
        const main = document.querySelector('main');
        main.classList.add('screen-container');
    
        console.log(indexes);
        console.log(family);
        console.log(content);
    
        return [indexes, family, content];
    }

}
