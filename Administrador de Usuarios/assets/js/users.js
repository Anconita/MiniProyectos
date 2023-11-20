const tableBody = document.querySelector('.tableBody');
const search = document.querySelector('.search');
const addUserForm = document.querySelector('.addUserForm');
const add_user = document.querySelector('.add_user');
const darkLayer = document.querySelector('.darkLayer')
const btn_form = document.querySelector('.btn_form');
const delete_selected = document.querySelector('.delete_selected')
const th_checkbox = document.querySelector('.th_checkbox')
let usuarios = [
    {
        id: crypto.randomUUID(),
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@example.com",
        fechaNacimiento: "1998-05-15",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "María",
        apellido: "García",
        email: "maria.garcia@example.com",
        fechaNacimiento: "2001-11-30",
        localidad: "Chile",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Carlos",
        apellido: "Rodríguez",
        email: "carlos.rodriguez@example.com",
        fechaNacimiento: "1995-02-10",
        localidad: "Venezuela",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Ana",
        apellido: "Martínez",
        email: "ana.martinez@example.com",
        fechaNacimiento: "1999-08-22",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Pedro",
        apellido: "López",
        email: "pedro.lopez@example.com",
        fechaNacimiento: "1997-04-05",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Luisa",
        apellido: "Herrera",
        email: "luisa.herrera@example.com",
        fechaNacimiento: "2002-07-18",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Roberto",
        apellido: "González",
        email: "roberto.gonzalez@example.com",
        fechaNacimiento: "1996-10-03",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Laura",
        apellido: "Sánchez",
        email: "laura.sanchez@example.com",
        fechaNacimiento: "1998-01-20",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Javier",
        apellido: "Torres",
        email: "javier.torres@example.com",
        fechaNacimiento: "1994-12-08",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Carmen",
        apellido: "Jiménez",
        email: "carmen.jimenez@example.com",
        fechaNacimiento: "1997-09-14",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Daniel",
        apellido: "Ramírez",
        email: "daniel.ramirez@example.com",
        fechaNacimiento: "1999-03-25",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Sofía",
        apellido: "Medina",
        email: "sofia.medina@example.com",
        fechaNacimiento: "1995-06-12",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Eduardo",
        apellido: "Fernández",
        email: "eduardo.fernandez@example.com",
        fechaNacimiento: "2001-02-28",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Patricia",
        apellido: "Ruiz",
        email: "patricia.ruiz@example.com",
        fechaNacimiento: "1996-07-07",
        localidad: "Argentina",
        activo: false
    },
    {
        id: crypto.randomUUID(),
        nombre: "Francisco",
        apellido: "Herrera",
        email: "francisco.herrera@example.com",
        fechaNacimiento: "1998-11-16",
        localidad: "Argentina",
        activo: false
    }
];




//? Mostrar Formulario
add_user.addEventListener('click', () => {
    btn_form.removeAttribute('id', 'btn_form')
    mostrarFormulario()
    btn_form.textContent = 'Agregar usuario';
});

//? Ocultar Formulario
darkLayer.addEventListener('click', ocultarFormulario);

delete_selected.addEventListener('click', () => {
    eliminarSeleccionados();
})

//? Agregar o editar usuario
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const elemento = e.target;




    //! Evaluamos si Editamos o insertamos usuario
    let id = (elemento.id.value) ? elemento.id.value : crypto.randomUUID();

    //? Si los datos estan en orden, se crea y se agrega el usuario
    let nuevoUsuario = {
        id: id,
        nombre: elemento.name.value,
        apellido: elemento.surname.value,
        email: elemento.email.value,
        fechaNacimiento: elemento.birthDate.value,
        localidad: elemento.location.value,
        activo: false
    }



    if (elemento.id.value) {
        usuarios.forEach(usuario => {
            if (usuario.id === elemento.id.value) {
                const cambiosRealizados =
                    usuario.nombre !== elemento.name.value ||
                    usuario.apellido !== elemento.surname.value ||
                    usuario.email !== elemento.email.value ||
                    usuario.fechaNacimiento !== elemento.birthDate.value ||
                    usuario.localidad !== elemento.location.value;

                if (cambiosRealizados) {
                    usuario.nombre = elemento.name.value;
                    usuario.apellido = elemento.surname.value;
                    usuario.email = elemento.email.value;
                    usuario.fechaNacimiento = elemento.birthDate.value;
                    usuario.localidad = elemento.location.value;

                    Swal.fire({
                        title: '¡Cambios guardados!',
                        text: 'Los cambios en el usuario se han guardado correctamente.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire(
                        'Sin cambios',
                        'No se realizaron cambios en el usuario.',
                        'info'
                    );
                }

                return;
            }
        });
    } else {
        //! Email ya existe
        const usuarioExistente = usuarios.find(usuario => usuario.email === elemento.email.value);
        if (usuarioExistente) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡El correo electrónico ya existe!',
            });
            return;
        }
        usuarios.push(nuevoUsuario);
    }

    ocultarFormulario();
    mostrarUsuarios();
});

//? Buscar usuario
search.addEventListener('keyup', (e) => {
    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const inputValue = normalizeString(e.target.value.toLowerCase());
    const usuarioFiltrado = usuarios.filter((usuario) =>
        normalizeString(usuario.nombre.toLowerCase()).includes(inputValue)
    );
    mostrarUsuarios(usuarioFiltrado);
})

function mostrarUsuarios(usuarioFiltrado) {
    tableBody.innerHTML = ''
    let array = (usuarioFiltrado === undefined || '') ? usuarios : usuarioFiltrado
    array.forEach((usuario, i) => {
        tableBody.innerHTML += `
            <tr>
            <td class="td_checkbox"><input type="checkbox" id="select_user" class="select_user"></td>
            <td>${usuario.nombre} ${usuario.apellido}</td>
            <td>${usuario.email}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>${usuario.localidad}</td>
            <td><i class="edit_icon fas fa-edit" onclick="editarUsuario('${usuario.id}')"></i></td>
            <td><i class="delete_icon fas fa-trash-alt" onclick="eliminarUsuario(${i})"></i></td>
            </tr>
            `
    });
}

function editarUsuario(id) {
    const userEdit = usuarios.find((usuario) => {
        if (usuario.id === id) {
            console.log(`Se encontro el usurio con el ID: ${usuario.id}`)
            return true;
        }
    })

    if (!userEdit) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡El usuario a editar no existe!',
        });
        return
    }

    mostrarFormulario()

    const el = addUserForm.elements
    el.id.value = userEdit.id
    el.name.value = userEdit.nombre
    el.surname.value = userEdit.apellido
    el.email.value = userEdit.email
    el.birthDate.value = userEdit.fechaNacimiento
    el.location.value = userEdit.localidad

    btn_form.setAttribute('id', 'btn_form')
    btn_form.textContent = 'Guardar cambios'
}

function eliminarUsuario(i) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al usuario. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar usuario'
    }).then((result) => {
        if (result.isConfirmed) {
            usuarios.splice(i, 1);
            mostrarUsuarios();
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

function eliminarSeleccionados() {
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
            const usuariosActivos = usuarios.filter(usuario => !usuario.activo);
            usuarios = usuariosActivos;
            mostrarUsuarios();
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

function mostrarFormulario() {
    addUserForm.id = 'addUserForm';
    darkLayer.id = 'darkLayer';
}

function ocultarFormulario() {
    addUserForm.removeAttribute('id');
    darkLayer.removeAttribute('id');
    addUserForm.reset()
}

mostrarUsuarios()


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

        if (checkbox.checked) {
            usuarios[index].activo = true;
            console.log(`El checkbox ${index} está marcado.`);
        } else {
            usuarios[index].activo = false;
            console.log(`El checkbox ${index} no está marcado.`);
        }
    }
});


