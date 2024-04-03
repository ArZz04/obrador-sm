class Product {
    constructor(active, family_id, id, last_modified, name, price, subfamilyId ) {
        this.active = active;
        this.family_id = family_id;
        this.id = id;
        this.last_modified = last_modified;
        this.name = name;
        this.price = price;
        this.subfamilyId = subfamilyId
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getInfo(){
        return this.id, this.name, this.price;
    }

    displayInfo() {
        console.log(`Product: ${this.name}, Price: ${this.price}`);
    }
}
