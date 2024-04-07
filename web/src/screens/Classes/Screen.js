export class Screen {
    constructor() {
        this.products = [];
        this.divs = [];
        this.currentIndex = 0;
    }

    addProducts(products) {
        this.products.push(products);
    }

    addDiv(div) {
        this.divs.push(div);
    }

    static createSpan(className, textContent) {
        const span = document.createElement('span');
        span.classList.add(...className.split(' '));
        span.textContent = textContent;
        return span;
    }

    static createProductDiv(product) {
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

    static renderProducts(products) {
        const productsContainer = document.createElement('div');
    
        products.forEach(product => {
            const productDiv = Screen.createProductDiv(product);
            productsContainer.appendChild(productDiv);
        });
    
        return productsContainer;
    }

}
