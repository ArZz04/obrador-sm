class Product extends HTMLElement {
    constructor() {
        super();
        
        this.dotNumber = 0;
        this.name = '';
        this.format = '';
        this.price = 0;
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

        const nameSpan = Product.createSpan('pname text-black', `${product.name} `);
        const dotNumber = '.'.repeat(product.dots);
        const dotsSpan = Product.createSpan('pdots text-green', dotNumber);
        const formatSpan = Product.createSpan('pformat text-black', `${product.format}`);
        const priceSpan = Product.createSpan('pprice text-black', ` $${product.price}`);

        productDiv.appendChild(nameSpan);
        productDiv.appendChild(dotsSpan);
        productDiv.appendChild(priceSpan);
        productDiv.appendChild(formatSpan);

        return productDiv;
    }

    static get observedAttributes() {
        return ['name', 'dots', 'format', 'price'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name') {
            this.name = newValue || '';
        } else if (name === 'dots') {
            this.dotNumber = parseInt(newValue) || 0;
        } else if (name === 'format') {
            this.format = newValue || '';
        } else if (name === 'price') {
            this.price = parseFloat(newValue) || 0;
        }
    }

    connectedCallback() {
        // Obtener los valores de los atributos o establecer valores predeterminados
        

        const productName = this.getAttribute('name') || null;
        const productDots = parseInt(this.getAttribute('dots')) || null;
        const productFormat = this.getAttribute('format') || null;
        const productPrice = parseFloat(this.getAttribute('price')) || null;
        

        // Crear el objeto de producto
        const product = {
            name: productName,
            dots: productDots,
            format: productFormat,
            price: productPrice
        };

        // Crear el elemento de producto utilizando el método estático
        const productElement = Product.createProduct(product);

        // Agregar el elemento de producto al componente
        this.appendChild(productElement);
    }
}

window.customElements.define('product-element', Product);
