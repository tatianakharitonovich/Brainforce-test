if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

const burger = document.querySelector('.header__burger_button'),
blockNav = document.querySelector('.header__nav'),
navLink = document.querySelectorAll('.header__link'),
button= document.querySelectorAll('.main__article_button'),
articleText = document.querySelectorAll('.main__article_text'),
articleTitle = document.querySelectorAll('.main__article_title');

burger.addEventListener('click', ()=> {
	burger.classList.toggle ('header__burger_button_click'); 
	navLink.forEach (item => item.classList.toggle ('header__link_click'));
	blockNav.classList.toggle ('header__nav_click');
});

blockNav.addEventListener('click',close);

navLink.forEach (item => {item.addEventListener('click', close)});

button.forEach ((item, index) => item.onclick = openText.bind(this, index));

articleTitle.forEach ((item, index) => item.onclick = openText.bind(this, index));

function openText (index) {
	button[index].classList.toggle('main__article_button_rotate');
	articleText[index].classList.toggle('main__article_text_open');
	console.log(button[index]);
}
	
function close() {
		navLink.forEach (item => item.classList.remove ('header__link_click'));
		burger.classList.remove ('header__burger_button_click');
		blockNav.classList.remove ('header__nav_click');
}


