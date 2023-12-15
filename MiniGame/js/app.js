const characterElement = document.querySelectorAll('.character');
const characters = [
    {
        name: 'mario',
        fullName: 'Mario',
    },
    {
        name: 'luigi',
        fullName: 'Luigi',
    },
    {
        name: 'bowser',
        fullName: 'Bowser Morton Koopa',
    },
    {
        name: 'peach',
        fullName: 'Princesa Peach Toadstool',
    },
    {
        name: 'yoshi',
        fullName: 'T. Yoshisaur Munchakoopas',
    },
    {
        name: 'toad',
        fullName: 'Toad',
    },
    {
        name: 'toadette',
        fullName: 'Toadette',
    },
];

document.querySelector('.btn-presentar').addEventListener('click', setNameEntered);

//? Alternar entre mostrar u ocultar personaje
characterElement.forEach(character => {
    character.addEventListener('click', () => {
        toggleCharacterPresented(character)
    })
});

function setNameEntered() {
    const userCharacterName = prompt('¿Quién se presenta hoy? (Mario, Luigi, Bowser, Peach, Yoshi, Toad, Toadette, Daisy)').toLowerCase()
    showCharacterFullName(userCharacterName)
}

function showCharacterFullName(nameEntered) {
    const chrNameFound = characters.find((character => character.name === nameEntered))
    chrNameFound !== undefined ? presentCharacter(chrNameFound) : null
    nameEntered = chrNameFound ? chrNameFound.fullName : '(Desconocido)'
    document.querySelector('.characterSpan').innerHTML = nameEntered
}

function presentCharacter(character) {
    document.querySelector(`#${character.name}`).title = 'Presentado';
}

function toggleCharacterPresented(character) {
    const hasTitle = character.hasAttribute('title')
    hasTitle ? character.removeAttribute('title') : character.setAttribute('title', 'Presentado')
    if (!hasTitle) {
        let characterSelected = character;
        const chrNameFound = characters.find((character => character.name === characterSelected.id))
        document.querySelector('.characterSpan').innerHTML = chrNameFound.fullName
        characterElement.forEach(chr => {
            if (chr !== characterSelected) {
                chr.title ? chr.removeAttribute('title') : null
            }
        });
    }
}