const burger = document.querySelector('.header__burger_button'),
blockNav = document.querySelector('.header__nav'),
navLink = document.querySelectorAll('.header__link');


burger.addEventListener('click', ()=> {
	burger.classList.toggle ('header__burger_button_click'); 
	navLink.forEach (item => item.classList.toggle ('header__link_click'));
	blockNav.classList.toggle ('header__nav_click');
});

blockNav.addEventListener('click',close);

navLink.forEach (item => {item.addEventListener('click', close)});

function close() {
		navLink.forEach (item => item.classList.remove ('header__link_click'));
		burger.classList.remove ('header__burger_button_click');
		blockNav.classList.remove ('header__nav_click');
}


