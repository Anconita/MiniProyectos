const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', toggleMenu)

function toggleMenu() {
    menuIcon.classList.toggle('active_menu');
    mobileMenu.classList.toggle('active_menu')
}