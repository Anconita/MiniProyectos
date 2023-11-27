let products = JSON.parse(localStorage.getItem('products'))

function showProducts() {
    products.forEach((product, i) => {
        const productType = (product.type === 'Running') ? 'running' : 'mountain';
        const container = document.querySelector(`.${productType}-container`);

        container.innerHTML +=
            `
                <div class="product ${productType}">
                    <img src="./assets/img/product.png">
                    <div class="text-producto-container">
                        <div class="product-title-container">
                            <h4>${product.productName.toUpperCase()}</h4>
                            <hr>
                        </div>
                        <p>${product.description}</p>
                        <div class="product-bottom-container">
                            <div class="product-price-container">
                                <p>$${product.price}</p>
                                <p>3 cuotas de $${(product.price / 3).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</p>
                            </div>
                            <button>Ver más</button>
                        </div>
                    </div>
                </div>
            `;
    });
}
showProducts()

function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
updateLocalStorage()

//? Formularios
const registerForm = document.querySelector('.registerForm');
const btnRegister = document.querySelector('.btnRegister');
const darkLayer = document.querySelector('.darkLayer');

btnRegister.addEventListener('click', openForm);
darkLayer.addEventListener('click', closeForm);

function openForm() {
    darkLayer.setAttribute('id', 'darkLayer');
    registerForm.setAttribute('id', 'registerForm');
    addUserForm.elements.name.focus()
}

function closeForm() {
    darkLayer.removeAttribute('id', 'darkLayer');
    registerForm.removeAttribute('id', 'registerForm');
    resetForm()
}

function resetForm() {
    registerForm.reset()
    btn_form.removeAttribute('id', 'btn_form')
}

