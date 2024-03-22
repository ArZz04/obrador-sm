
const API_URL = 'https://api-web.arzz.tech' || 'http://localhost:5000';
const API_URLs = 'http://localhost:5000';

function openModal(event) {
    event.preventDefault();

    const modalContainer = document.querySelector('#modal-div');
    modalContainer.classList.remove('hidden');
}

function closeModal() {
    const modalContainer = document.querySelector('#modal-div');
    modalContainer.classList.add('hidden');
}

function clearInputs() {
    document.getElementById('Family-select').value = '';
    document.getElementById('Subfamily-select').value = '';
    document.getElementById('ProductName-select').value = '';
    document.getElementById('price-input').value = '';
}

function putPriceApi(newPrice, productId) {
    const url = `${API_URLs}/api/product/${productId}`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: newPrice })
    })
}

function uploadPrice() {
    const newPrice = document.getElementById('price-input').value;
    const familyProduct = document.getElementById('Family-select').value;
    const subFamilyProduct = document.getElementById('Subfamily-select').value;
    const productId = document.getElementById('ProductName-select').value;

    if (newPrice === '' || familyProduct === '' || subFamilyProduct === '' || productId === '') {
        alert("Favor de elegir e insertar valores válidos!!");
        clearInputs();
    } else {
        const message = "El producto con id: " + productId + " de la familia " + (familyProduct + 1) + " y subfamilia " + subFamilyProduct + " fue modificado. Su nuevo precio es: $" + newPrice;

        putPriceApi(parseFloat(newPrice), parseInt(productId))
            .then(response => {
                if (response.ok) {
                    alert(message);
                } else {
                    throw new Error('Hubo un error al actualizar el precio, contacte a Soporte...');
                }
            })
            .catch(error => {
                console.error('Error al actualizar el precio:', error);
                alert('Hubo un error al actualizar el precio, contacte a Soporte...');
            })
            .finally(() => {
                closeModal();
            });
    }
}