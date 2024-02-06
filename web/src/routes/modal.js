
// JavaScript para manejar la apertura del modal y evitar la redirección del formulario
function openModal(event) {
    event.preventDefault();  // Evita la acción predeterminada del formulario

    // Crea el modal y muestra el contenido
    const modalContainer = document.querySelector('#modal-div');
    modalContainer.classList.remove('hidden');
}

// Función para cerrar el modal
function closeModal() {
    // Oculta y elimina el modal
    const modalContainer = document.querySelector('#modal-div');
    modalContainer.classList.add('hidden');
}

function clearInputs() {
    document.getElementById('Family-select').value = '';
    document.getElementById('Subfamily-select').value = '';
    document.getElementById('ProductName-select').value = '';
    document.getElementById('price-input').value = '';
}

function uploadPrice() {
    const newPrice = document.getElementById('price-input').value;
    const familyProduct = document.getElementById('Family-select').value;
    const subFamilyProduct = document.getElementById('Subfamily-select').value;
    const productName = document.getElementById('ProductName-select').value;

    if (newPrice == ''|| familyProduct == ''|| subFamilyProduct == '' ||  productName == ''){
        alert("Favor de elegir e insertar valores validos!!")
        clearInputs();
    }else{
        const message = "El producto: " + productName + " de la familia " + familyProduct + " y subfamilia " + subFamilyProduct + " fue modificado. Su nuevo precio es: " + newPrice;
        alert(message);
    }


    closeModal()
}