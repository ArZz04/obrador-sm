export class Screen {
    constructor() {
        this.products = [];
    }

    
    static createProductsDiv(products) {
        const productsContainer = document.createElement('div');

        console.log(products);
    
        products.forEach(product => {
            const productDiv = Screen.createProduct(product);
            productsContainer.appendChild(productDiv);
        });
        
        return productsContainer;
    }

    createScreen(indexes, family, content) {
        const main = document.querySelector('main');
        main.classList.add('screen-container');

        for (let i = 0; i < indexes; i++) {
            var Scr = Screen.createProductsDiv(content[i]);
        }

        //const Scr = Screen.createProductsDiv(content[0]);

        return Scr;
    }

}
