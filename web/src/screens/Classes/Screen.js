export class Screen {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    static createSpan(className, textContent) {
        const span = document.createElement('span');
        span.classList.add(...className.split(' '));
        span.textContent = textContent;
        return span;
    }

    static renderProducts(products) {
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

}
