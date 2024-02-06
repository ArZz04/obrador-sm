const API_URL = "https://api-web.arzz.tech"

const HTMLResponse = document.querySelector("#list")

fetch(`${API_URL}/api/products/family/3`)
    .then((response) => response.json())
    .then((products) => {
        const tpl = products.map(product => `<li " >${product.name} ....................................... $${product.price}</li>`);
        HTMLResponse.innerHTML = `<ul class="text-list pt-36 absolute >${tpl}</ul>`;
    });