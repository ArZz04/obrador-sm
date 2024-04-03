class Products {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }


    displayProducts() {
        this.products.forEach(product => {
            product.displayInfo();
        });
    }
}