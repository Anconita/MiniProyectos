const darkLayer = document.querySelector('.darkLayer');
const addUserForm = document.querySelector('.addUserForm');
const add_user = document.querySelector('.add_user');
const tableBody = document.querySelector('.tableBody');
const search = document.querySelector('.search');
const btn_form = document.querySelector('.btn_form');
const delete_selected = document.querySelector('.delete_selected')
const th_checkbox = document.querySelector('.th_checkbox')
let usersStart = [
    {
        id: crypto.randomUUID(),
        name: "Juan",
        lastName: "Pérez",
        email: "juan.perez@example.com",
        birthDate: "1998-05-15",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "María",
        lastName: "García",
        email: "maria.garcia@example.com",
        birthDate: "2001-11-30",
        location: "Chile",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Carlos",
        lastName: "Rodríguez",
        email: "carlos.rodriguez@example.com",
        birthDate: "1995-02-10",
        location: "Venezuela",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Ana",
        lastName: "Martínez",
        email: "ana.martinez@example.com",
        birthDate: "1999-08-22",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Pedro",
        lastName: "López",
        email: "pedro.lopez@example.com",
        birthDate: "1997-04-05",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Luisa",
        lastName: "Herrera",
        email: "luisa.herrera@example.com",
        birthDate: "2002-07-18",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Roberto",
        lastName: "González",
        email: "roberto.gonzalez@example.com",
        birthDate: "1996-10-03",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Laura",
        lastName: "Sánchez",
        email: "laura.sanchez@example.com",
        birthDate: "1998-01-20",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Javier",
        lastName: "Torres",
        email: "javier.torres@example.com",
        birthDate: "1994-12-08",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Carmen",
        lastName: "Jiménez",
        email: "carmen.jimenez@example.com",
        birthDate: "1997-09-14",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Daniel",
        lastName: "Ramírez",
        email: "daniel.ramirez@example.com",
        birthDate: "1999-03-25",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Sofía",
        lastName: "Medina",
        email: "sofia.medina@example.com",
        birthDate: "1995-06-12",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Eduardo",
        lastName: "Fernández",
        email: "eduardo.fernandez@example.com",
        birthDate: "2001-02-28",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Patricia",
        lastName: "Ruiz",
        email: "patricia.ruiz@example.com",
        birthDate: "1996-07-07",
        location: "Argentina",
        active: false
    },
    {
        id: crypto.randomUUID(),
        name: "Francisco",
        lastName: "Herrera",
        email: "francisco.herrera@example.com",
        birthDate: "1998-11-16",
        location: "Argentina",
        active: false
    }
];

if(localStorage.getItem('users') === null){
    localStorage.setItem('users', JSON.stringify(usersStart));
}

let users = JSON.parse(localStorage.getItem('users'))

//? Abrimos Formulario
add_user.addEventListener('click', openForm)

//? Cerramos Formulario
darkLayer.addEventListener('click', closeForm)

//? Insertamos/Editamos Usuario
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let element = e.target.elements

    let id = (element.id.value) ? element.id.value : crypto.randomUUID();

    let user = {
        id: id,
        name: element.name.value,
        lastName: element.lastName.value,
        email: element.email.value,
        birthDate: element.birthDate.value,
        location: element.location.value,
        active: false
    }

    if (element.id.value) {
        let indexUser = users.findIndex(user => user.id === element.id.value);
        const changesMade =
            users[indexUser].name !== user.name ||
            users[indexUser].lastName !== user.lastName ||
            users[indexUser].email !== user.email ||
            users[indexUser].birthDate !== user.birthDate ||
            users[indexUser].location !== user.location;

        if (!changesMade) {
            Swal.fire(
                'Sin cambios',
                'No se realizaron cambios en el usuario.',
                'info'
            );
            return;
        }

        //! E-Mail existente
        const existingUser = users.find(u => u.email === element.email.value && u.id !== element.id.value);
        if (existingUser) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡El correo electrónico ya existe!',
            });
            return
        }

        users[indexUser] = user;
        Swal.fire({
            title: '¡Cambios guardados!',
            text: 'Los cambios en el usuario se han guardado correctamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });

    } else {
        //! E-Mail existente
        const existingUser = users.find(user => user.email === element.email.value);
        if (existingUser) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡El correo electrónico ya existe!',
            });
            return
        }
        users.push(user)
    }
    closeForm()
    updateLocalStorage()
    showUsers(users)
})

//? Buscamos Usuarios
search.addEventListener('keyup', (e) => {
    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const search = normalizeString(e.target.value.toLowerCase());
    const userFiltered = users.filter((user) =>
        normalizeString(user.name.toLowerCase()).includes(search)
    );

    showUsers(userFiltered)

})

//? Eliminamos Usuarios
delete_selected.addEventListener('click', removeSelected)

function showUsers(filter) {
    tableBody.innerHTML = ''
    let array = (filter === undefined || '') ? users : filter
    array.forEach((user, i) => {
        tableBody.innerHTML +=
            `
        <tr>
            <td class="td_checkbox"><input type="checkbox" id="select_user" class="select_user"></td>
            <td>${user.name} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.birthDate}</td>
            <td>${user.location}</td>
            <td><i class="edit_icon fas fa-edit" onclick="editUser('${user.id}')"></i></td>
            <td><i class="delete_icon fas fa-trash-alt" onclick="deleteUser('${user.id}')"></i></td>
        </tr>
        `
    });
    delete_selected.style.display = (users.length === 0) ? 'none' : 'block';
}
showUsers()

function editUser(userId) {
    let userFound = users.find((user => user.id === userId))

    let element = addUserForm.elements
    element.id.value = userFound.id
    element.name.value = userFound.name
    element.lastName.value = userFound.lastName
    element.email.value = userFound.email
    element.birthDate.value = userFound.birthDate
    element.location.value = userFound.location
    btn_form.setAttribute('id', 'btn_form')
    btn_form.textContent = 'Guardar Usuario'
    openForm()
}

function deleteUser(userId) {
    Swal.fire({
        title: `¿Deseas Eliminar a ${users[userFound].name}?`,
        text: 'Esta acción eliminará al usuario. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar usuario'
    }).then((result) => {
        if (result.isConfirmed) {
            let userFound = users.findIndex((user => user.id === userId));
            userFound = userFound;
            users.splice(userFound, 1);
            showUsers();
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

function removeSelected() {
    const activeUsers = users.filter(user => !user.active);
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará a los usuarios seleccionados. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar usuario'
    }).then((result) => {
        if (result.isConfirmed) {
            const activeUsers = users.filter(user => !user.active);
            users = activeUsers;
            showUsers();
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El usuario ha sido eliminado correctamente.',
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
    addUserForm.elements.name.focus()
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
    btn_form.textContent = 'Agregar Usuario'
}

function updateLocalStorage() { 
    localStorage.setItem('users', JSON.stringify(users));
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
        users[index].active = (checkbox.checked) ? true : false;
    }
});