const darkLayer = document.querySelector('.darkLayer');
const addUserForm = document.querySelector('.addUserForm');
const add_user = document.querySelector('.add_user');
const tableBody = document.querySelector('.tableBody');
const delete_selected = document.querySelector('.delete_selected');
const btn_form = document.querySelector('.btn_form');
const search = document.querySelector('.search');
const th_checkbox = document.querySelector('.th_checkbox');

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

//? Insertamos/Editamos Producto
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
        products[indexProduct].price = parseInt(products[indexProduct].price);
        product.price = parseInt(product.price);

        const changesMade =
            products[indexProduct].productName !== product.productName ||
            products[indexProduct].price !== product.price ||
            products[indexProduct].type !== product.type ||
            products[indexProduct].description !== product.description;

        if (!changesMade) {
            Swal.fire(
                'Sin cambios',
                'No se realizaron cambios en el producto.',
                'info'
            );
            return
        } else {
            products[indexProduct] = product;
            Swal.fire({
                title: '¡Cambios guardados!',
                text: 'Los cambios en el producto se han guardado correctamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        }


    } else {
        products.push(product);
    }

    updateLocalStorage()
    closeForm()
    showProducts();

})

//? Buscamos productos
search.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    const filterProduct = products.filter((product => product.productName.toLowerCase().includes(value)))
    showProducts(filterProduct)
})

//? Eliminamos Productos
delete_selected.addEventListener('click', removeSelected)

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
    Swal.fire({
        title: `¿Deseas Eliminar ${products[productIndex].productName}?`,
        text: 'Esta acción eliminará el producto. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar usuario'
    }).then((result) => {
        if (result.isConfirmed) {
            let productIndex = products.findIndex((product => product.id === productId))
            products.splice(productIndex, 1)
            updateLocalStorage();
            showProducts()
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El usuario ha sido eliminado correctamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            });
            updateLocalStorage()
        }
    });
}

function updateProduct(productId) {
    const foundProduct = products.find((product => product.id === productId))

    const element = addUserForm.elements
    element.id.value = foundProduct.id
    element.productName.value = foundProduct.productName
    element.price.value = foundProduct.price
    element.type.value = foundProduct.type
    element.description.value = foundProduct.description
    btn_form.setAttribute('id', 'btn_form')

    btn_form.textContent = 'Editar Producto'
    openForm()
}

function removeSelected() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará a los productos seleccionados. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar usuario'
    }).then((result) => {
        if (result.isConfirmed) {
            const activeProducts = products.filter(product => !product.active);
            products = activeProducts;
            showProducts();
            Swal.fire({
                title: '¡Eliminado!',
                text: 'Los productos han sido eliminado correctamente.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            });
        }
    });
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

th_checkbox.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.select_user_body');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = th_checkbox.checked;
    });
});

document.querySelector('.tableBody').addEventListener('click', (event) => {
    const checkbox = event.target.closest('.select_user');

    if (checkbox) {
        const index = Array.from(checkbox.closest('tr').parentElement.children).indexOf(checkbox.closest('tr'));
        products[index].active = (checkbox.checked) ? true : false;
    }
});