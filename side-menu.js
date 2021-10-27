let sideMenu = document.querySelector('.side-menu');
let modalBg = document.querySelector('.modal-bg');

burgerMenuIcon.addEventListener('click', () => {
	// if menu is closed,
	if (!sideMenu.classList.contains('side-menu-opened')) {
		// remove display none. 
		modalBg.classList.remove('modal-bg-d-none');
		
		burgerMenuIcon.style.position = 'fixed'
	} else { // if menu is open, add display none.
		//if filter menu is opened, ignore adding display none to modal bg.
		if (!sideFilter.classList.contains('main-filter-active')) {
			modalBg.classList.add('modal-bg-d-none');
		}
		burgerMenuIcon.style.position = 'absolute';

	}
	// Open-close state
	sideMenu.classList.toggle('side-menu-opened');
	// Changing color of the icon
	burgerMenuIcon.classList.toggle('dark-color');
	let icon = burgerMenuIcon.querySelector('i');
	// Changing icon
	if (icon.classList.contains('fa-bars')) {
		icon.classList.toggle('fa-bars');
		icon.classList.toggle('fa-times');
	} else {
		icon.classList.toggle('fa-bars');
		icon.classList.toggle('fa-times');
	}
});

// Side filter:
let sideFilter = document.querySelector('.main-filter');
filterSideBtn.addEventListener('click', () => {
	if (!sideFilter.classList.contains('main-filter-active')) {
		modalBg.classList.remove('modal-bg-d-none');
	} else {
		if (!sideMenu.classList.contains('side-menu-opened')) {
			modalBg.classList.add('modal-bg-d-none');
		}
	}

	sideFilter.classList.toggle('main-filter-active');
	// Creating filterSideBtn movement:
	filterSideBtn.classList.toggle('filter-side-btn-active');
});
