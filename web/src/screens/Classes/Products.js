export class Products {
    constructor() {
        this.products = [];
    }

    addProduct(products) {
        // Verificar si products es un array
        if (!Array.isArray(products)) {
            throw new Error('Los productos deben ser proporcionados como un array.');
        }
        // Agregar los productos al array this.products
        this.products.push(...products);
    }

    getProducts() {
        return this.products;
    }

    getProductsByIds(familyId, subfamilyId) {
        return this.products.filter(product => 
            product.familyId === familyId && product.subfamilyId === subfamilyId
        );
    }
    
}

