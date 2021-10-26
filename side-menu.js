let sideMenu = document.querySelector('.side-menu');

burgerMenuIcon.addEventListener('click', () => {
	sideMenu.classList.toggle('side-menu-opened');
	burgerMenuIcon.classList.toggle('dark-color');
	let icon = burgerMenuIcon.querySelector('i');
	if (icon.classList.contains('fa-bars')) {
		icon.classList.toggle('fa-bars');
		icon.classList.toggle('fa-times');
	} else {
		icon.classList.toggle('fa-bars');
		icon.classList.toggle('fa-times');
	}
});
