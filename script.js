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
articleTitle = document.querySelectorAll('.main__article_title'),
darkLayer = document.getElementById('shadow');



burger.addEventListener('click', ()=> {
	burger.classList.toggle ('header__burger_button_click'); 
	navLink.forEach (item => item.classList.toggle ('header__link_click'));
	blockNav.classList.toggle ('header__nav_click');
  darkLayer.style.display='block';
  document.body.appendChild(darkLayer);
});

darkLayer.addEventListener('click',close);

navLink.forEach (item => {item.addEventListener('click', close)});

button.forEach ((item, index) => {
  item.onclick = openText.bind(this, index);
  item.onmouseover = appointFocus.bind(this, index);
  item.onmouseout = canselFocus.bind(this, index);
  item.onblur = canselFocus.bind(this, index)

});

articleTitle.forEach ((item, index) => item.onclick = openText.bind(this, index));

function openText (index) {
	button[index].classList.toggle('main__article_button_rotate');
  articleText[index].classList.toggle('main__article_text_open');
  button[index].blur();
 }

function appointFocus (index) {
  button[index].style.backgroundImage = 'url(img/startactive.png)';
 }

function canselFocus (index) {
  button[index].style.backgroundImage = 'url(img/statnormal.png)';
}
	
function close() {
		navLink.forEach (item => item.classList.remove ('header__link_click'));
    darkLayer.style.display='none';
		burger.classList.remove ('header__burger_button_click');
		blockNav.classList.remove ('header__nav_click');
}

const buttonClose = document.getElementById('buttonClose'),
  inputName = document.getElementById('users'),
  inputPhone = document.getElementById('phone'),
  nameMess = document.getElementById('nameMess'),
  phoneMess = document.getElementById('phoneMess'),
  buttonSubmit = document.getElementById('buttonSubmit'),
  modalWin = document.getElementById('popupWin');

function showModalWin() {
  darkLayer.style.display='block';
  modalWin.style.display = 'block';


  buttonClose.onclick = closeModalWin;

  darkLayer.onclick = closeModalWin;

  function closeModalWin () {
    darkLayer.style.display='none';
    modalWin.style.display = 'none';
    inputName.value='';
    inputPhone.value='';
    inputName.style.marginBottom = '30px';
    inputName.style.border='1px solid #828282';
    nameMess.style.display='none';
    nameMess.style.color='#219653';
    phoneMess.style.display='none';
    inputPhone.style.marginBottom = '40px';
    inputPhone.style.border='1px solid #828282';
    inputPhone.placeholder = 'Телефон';
    phoneMess.style.color='#219653';
    phoneMess.innerHTML = ``;
    return false;
  }

  inputName.addEventListener('focus', function (event) {
    this.style.border='1px solid #333333';
    this.style.color = '#333333';
  });

  inputName.addEventListener('input', activeInputName);

  inputName.addEventListener('blur', blurInputName);

  inputPhone.addEventListener('focus', function (event) {
    this.placeholder = '+375(__)___-__-__';
    this.style.border='1px solid #333333';
    this.style.color = '#333333';
    this.style.marginBottom = '40px';
    phoneMess.style.display ='none';
    setCursorPosition(3, this);
  });

  inputPhone.addEventListener("input", mask, false);

  inputPhone.addEventListener('blur', blurInputPhone);
  
  function activeInputName () {
    nameMess.innerHTML = `Осталось ${13-inputName.value.length} знака(ов)`;
    nameMess.style.display ='block';
    nameMess.style.color ='#219653';
    this.style.border='1px solid #333333';
    this.style.color = '#333333';
    this.style.marginBottom = '0';
  }

  function blurInputName () {
    nameMess.style.display ='none';
    this.style.marginBottom = '30px';
    this.style.border ='1px solid #828282';
    this.style.color = '#828282';

  }

  function blurInputPhone (event) {
    phoneMess.style.display ='none';
    this.style.marginBottom = '40px';
    this.style.border='1px solid #828282';
  }

  function setCursorPosition(pos, e) {
    if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    else if (e.createTextRange) {
      let range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask(event) {
    phoneMess.style.display ='none';
    this.style.marginBottom = '40px';

    let matrix = this.placeholder,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
      return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
  }

  buttonSubmit.onclick = sendSubmit;

  function sendSubmit() {
    if (inputName.value ==='') {
      nameMess.innerHTML = `Обязательное поле`;
      nameMess.style.display='block';
      nameMess.style.color='#EB5757';
      inputName.style.marginBottom = '0';
      inputName.style.border='2px solid #EB5757';
    }
    
    if (inputPhone.value ==='') {
      phoneMess.innerHTML = `Обязательное поле`;
      phoneMess.style.display='block';
      phoneMess.style.color='#EB5757';
      inputPhone.style.marginBottom = '0';
      inputPhone.style.border='2px solid #EB5757';
    }
    
    if (inputPhone.value !='' && (inputPhone.value.includes('_') || inputPhone.value.indexOf('+375', 0) === -1)) {
        inputPhone.focus();
        inputPhone.style.marginBottom = '0';
        phoneMess.innerHTML = `Неверный номер`;
        phoneMess.style.display ='block';
        phoneMess.style.color ='#219653';
    } 

    if (inputName.value !='' && 
        inputPhone.value !='' && 
        !inputPhone.value.includes('_') && 
        inputPhone.value.indexOf('+375', 0) != -1 ) {
        closeModalWin();
        openModalMes();
    }
  }

  function openModalMes () {
    const modalMes = document.getElementById('modalMes'),
    buttonCloseMes = document.getElementById('buttonCloseMes'); 

    darkLayer.style.display='block';
    modalMes.style.display = 'block';

    darkLayer.onclick = closeModalMes;
    buttonCloseMes.onclick = closeModalMes;

    function closeModalMes () {
      darkLayer.style.display='none';
      modalMes.style.display = 'none';
    }
  }
}