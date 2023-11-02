//? Tomando variables dede el DOM
const date = document.querySelector('#date');
const hourDom = document.querySelector('#hora');
const minuteDom = document.querySelector('#minuto');
const secondDom = document.querySelector('#segundo');

function formatearNumero(numero) {
    return numero < 10 ? '0' + numero : numero;
}

function actualizarReloj() {

    //? Creando el objeto Fecha
    const fechaActual = new Date();

    //? Dia, Mes y Año
    const day = fechaActual.getDate();
    const month = fechaActual.getMonth();

    let nameMonth = '';

    switch (month) {
        case 0:
            nameMonth = 'enero'
            break;
        case 1:
            nameMonth = 'febrero'
            break;
        case 2:
            nameMonth = 'marzo'
            break;
        case 3:
            nameMonth = 'abril'
            break;
        case 4:
            nameMonth = 'mayo'
            break;
        case 5:
            nameMonth = 'junio'
            break;
        case 6:
            nameMonth = 'julio'
            break;
        case 7:
            nameMonth = 'agosto'
            break;
        case 8:
            nameMonth = 'septiembre'
            break;
        case 9:
            nameMonth = 'octubre'
            break;
        case 10:
            nameMonth = 'noviembre'
            break;
        case 11:
            nameMonth = 'diciembre'
            break;

        default:
            break;
    }

    switch (day) {
        case 0:
            nameDay = 'Domingo'
            break;
        case 1:
            nameDay = 'Lunes'
            break;
        case 2:
            nameDay = 'Martes'
            break;
        case 3:
            nameDay = 'Miercoles'
            break;
        case 4:
            nameDay = 'Jueves'
            break;
        case 5:
            nameDay = 'Viernes'
            break;

        case 6:
            nameDay = 'Sabado'
            break;

        default:
            break;

    }

    date.innerText = `${day} de ${nameMonth}`;

    //? Hora, Minuto, Segundo
    const hour = fechaActual.getHours();
    const minute = fechaActual.getMinutes();
    const second = fechaActual.getSeconds();

    const formattedHour = formatearNumero(hour)
    const formattedMinute = formatearNumero(minute)
    const formattedSecond = formatearNumero(second)

    hourDom.innerText = formattedHour;
    minuteDom.innerText = formattedMinute;
    secondDom.innerText = formattedSecond;
}

setInterval(actualizarReloj, 1000);

actualizarReloj()