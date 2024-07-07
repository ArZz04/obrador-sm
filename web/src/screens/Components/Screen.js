
class Screen extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>
        <product-element name="BISTEX DE RES" dots="50" format="kg" price="130" ></product-element>z
    `
    }
}

window.customElements.define('screen-element', Screen);