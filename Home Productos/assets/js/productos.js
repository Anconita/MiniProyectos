let products = JSON.parse(localStorage.getItem('products'))

function showProducts() {
    products.forEach((product) => {
        const productType = (product.type === 'Running') ? 'running' : 'mountain';
        const container = document.querySelector(`.${productType}-container`);

        if (container) {
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
                            <a href="./pages/product.html?id=${product.id}">Ver más</a>
                        </div>
                    </div>
                </div>
            `;
        }

        if (!container) {
            const nameProduct = document.querySelector('.nameProduct').innerHTML = product.productName
            const priceProduct = document.querySelector('.priceProduct').innerHTML = product.price
            const descriptionProduct = document.querySelector('.descriptionProduct').innerHTML = product.description
            const typeProduct = document.querySelector('.typeProduct').innerHTML = productType
        }

    });

}
showProducts()

function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
updateLocalStorage()

