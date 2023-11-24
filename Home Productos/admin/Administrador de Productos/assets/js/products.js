const darkLayer = document.querySelector('.darkLayer');
const addUserForm = document.querySelector('.addUserForm');
const add_user = document.querySelector('.add_user');
const tableBody = document.querySelector('.tableBody');
const delete_selected = document.querySelector('.delete_selected');
const btn_form = document.querySelector('.btn_form');
const search = document.querySelector('.search');

const productsStart = [
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas Deportivas",
        price: 34999,
        type: "Mountain",
        description: "Zapatillas negras Adidas para entrenamiento",
        active: false
    },
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas Trail",
        price: 49999,
        type: "Running",
        description: "Zapatillas verdes Reebok para trail running",
        active: false
    },
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas Casual",
        price: 29999,
        type: "Running",
        description: "Zapatillas blancas Puma para uso diario",
        active: false
    },
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas CrossFit",
        price: 39999,
        type: "Mountain",
        description: "Zapatillas rojas Under Armour para CrossFit",
        active: false
    },
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas CrossFit",
        price: 39999,
        type: "Mountain",
        description: "Zapatillas rojas Under Armour para CrossFit",
        active: false
    },
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas Casual",
        price: 29999,
        type: "Running",
        description: "Zapatillas blancas Puma para uso diario",
        active: false
    },

    {
        id: crypto.randomUUID(),
        productName: "Zapatillas Casual",
        price: 29999,
        type: "Running",
        description: "Zapatillas blancas Puma para uso diario",
        active: false
    },
    {
        id: crypto.randomUUID(),
        productName: "Zapatillas Skate",
        price: 44999,
        type: "Mountain",
        description: "Zapatillas grises Vans para skateboarding",
        active: false
    },
];

if (localStorage.getItem('products') === null) {
    localStorage.setItem('products', JSON.stringify(productsStart));
}

let products = JSON.parse(localStorage.getItem('products'))

//? Abrimos Formulario
add_user.addEventListener('click', openForm)

//? Cerramos Formulario
darkLayer.addEventListener('click', closeForm)

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let element = e.target.elements;
    let id = (element.id.value) ? element.id.value : crypto.randomUUID();

    const product = {
        id: id,
        productName: element.productName.value,
        price: element.price.value,
        type: element.type.value,
        description: element.description.value,
        active: false
    }

    if (element.id.value) {
        let indexProduct = products.findIndex((product => product.id === element.id.value))
        products[indexProduct] = product;
    } else {
        products.push(product);
    }

    updateLocalStorage()
    closeForm()
    showProducts();

})

search.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    const filterProduct = products.filter((product => product.productName.toLowerCase().includes(value)))
    showProducts(filterProduct)
})

function showProducts(filter) {
    if (tableBody) tableBody.innerHTML = ''
    let array = (filter === undefined || filter === '') ? products : filter
    array.forEach((product) => {
        tableBody.innerHTML +=
            `
        <tr>
            <td class="td_checkbox"><input type="checkbox" id="select_user" class="select_user"></td>
            <td>${product.productName}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.type}</td>
            <td><i class="edit_icon fas fa-edit" onclick="updateProduct('${product.id}')"></i></td>
            <td><i class="delete_icon fas fa-trash-alt" onclick="deleteProduct('${product.id}')"></i></td>
        </tr>
        `
    });
    delete_selected.style.display = (products.length === 0) ? 'none' : 'block';
}
showProducts()

function deleteProduct(productId) {
    let productIndex = products.findIndex((product => product.id === productId))
    products.splice(productIndex, 1)
    updateLocalStorage();
    showProducts()
}

function updateProduct(productId) {
    const element = addUserForm.elements
    const foundProduct = products.find((product => product.id === productId))

    element.id.value = foundProduct.id
    element.productName.value = foundProduct.productName
    element.price.value = foundProduct.price
    element.type.value = foundProduct.type
    element.description.value = foundProduct.description
    btn_form.setAttribute('id', 'btn_form')

    btn_form.textContent = 'Editar Producto'
    openForm()
}

function openForm() {
    darkLayer.setAttribute('id', 'darkLayer');
    addUserForm.setAttribute('id', 'addUserForm');
    addUserForm.elements.productName.focus()
}

function closeForm() {
    darkLayer.removeAttribute('id', 'darkLayer');
    addUserForm.removeAttribute('id', 'addUserForm');
    resetForm()
}

function resetForm() {
    addUserForm.reset()
    addUserForm.elements.id.value = ''
    btn_form.removeAttribute('id', 'btn_form')
    btn_form.textContent = 'Agregar Producto'
}

function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}