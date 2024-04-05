export class Product {
    constructor(active, familyId, id, last_modified, name, price, subfamilyId, dots, format) {
        this.active = active;
        this.familyId = familyId;
        this.id = id;
        this.last_modified = last_modified;
        this.name = name;
        this.price = price;
        this.subfamilyId = subfamilyId;
        this.dots = dots;
        this.format = format;
    }

    setActive(active) {
        this.active = active;
    }

    setFamilyId(familyId) {
        this.familyId = familyId;
    }

    setId(id) {
        this.id = id;
    }

    setLastModified(last_modified) {
        this.last_modified = last_modified;
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
    }

    setSubfamilyId(subfamilyId) {
        this.subfamilyId = subfamilyId;
    }

    setDots(dots) {
        this.dots = dots;
    }

    setFormat(format) {
        this.format = format;
    }

    getActive() {
        return this.active;
    }

    getFamilyId() {
        return this.family_id;
    }

    getId() {
        return this.id;
    }

    getLastModified() {
        return this.last_modified;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getSubfamilyId() {
        return this.subfamilyId;
    }
}
