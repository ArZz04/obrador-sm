class Dots extends HTMLElement {
    constructor() {
        super();
        this.dotNumber = 0;
    }

    static get observedAttributes() {
        return ['dot-number'];
    }

    attributeChangedCallback(name) {
        if (name === 'dot-number') {
            this.dotNumber = parseInt(this.getAttribute('dot-number'));
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <span class="pdots text-green">${'.'.repeat(this.dotNumber)}</span>
        `;
    }
}

window.customElements.define('dots-element', Dots);
