const date = document.querySelector('#date');
const hourDom = document.querySelector('#hora');
const minuteDom = document.querySelector('#minuto');
const secondDom = document.querySelector('#segundo');

const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function actualizarReloj() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const nameMonth = months[currentDate.getMonth()];
    const nameDay = days[currentDate.getDay()];

    date.innerText = `${nameDay}, ${day} de ${nameMonth}`;

    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    //? Agrego el '0' cuando el numero es menor a 2 digitos
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    const formattedSecond = String(second).padStart(2, '0');

    hourDom.innerText = formattedHour;
    minuteDom.innerText = formattedMinute;
    secondDom.innerText = formattedSecond;
}

setInterval(actualizarReloj, 1000);
actualizarReloj();