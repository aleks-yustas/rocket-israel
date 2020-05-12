'use strict';

(function () {
  var ECS_KEYCODE = 27;
  var callbackLinkOpen = document.querySelector('.hero__callback');

  var popupCallback = document.querySelector('.js--popup-callback');
  var popupCloseButton = popupCallback.querySelector('.popup__close');
  var popupOverlay = popupCallback.querySelector('.popup__overlay');

  var openPopup = function () {
    popupCallback.classList.remove('popup--close');
    popupOverlay.addEventListener('click', overlayClickHandler);
    popupCloseButton.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', escPressHandler);
    window.callbacForm.setFocus();
  };

  var closePopup = function () {
    popupCallback.classList.add('popup--close');
    popupOverlay.removeEventListener('click', overlayClickHandler);
    popupCloseButton.removeEventListener('click', closeButtonClickHandler);
    document.removeEventListener('keydown', escPressHandler);
  };

  var callbackLinkClickHandler = function (evt) {
    evt.preventDefault();
    openPopup();
  };

  var overlayClickHandler = function () {
    closePopup();
  };

  var closeButtonClickHandler = function () {
    closePopup();
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ECS_KEYCODE) {
      closePopup();
    }
  };

  callbackLinkOpen.addEventListener('click', callbackLinkClickHandler);

  window.popupCallback = {
    'open': openPopup,
    'close': closePopup
  };
})();

(function () {
  var PHONE_MASK = '{+7} (000) 000 00 00';

  var callbackForm = document.querySelector('.form-callback');
  var callbackNameInput = callbackForm.querySelector('#callback-name');
  var callbackTelInput = callbackForm.querySelector('#callback-phone');
  var callbackAgreement = callbackForm.querySelector('#callback-agreement');
  var validClass = 'text-field__input--valid';
  var invalidClass = 'text-field__input--invalid';

  var phoneMask = function (telInput) {
    window.iMaskJS(telInput, {
      mask: PHONE_MASK
    });
  };

  var invalidTextFieldHandler = function (evt) {
    evt.target.classList.add(invalidClass);
  };

  var changePhoneFieldHandler = function (evt) {
    if (evt.target.value.length < 18) {
      evt.target.classList.remove(validClass);
      evt.target.classList.add(invalidClass);
    } else {
      evt.target.classList.add(validClass);
      evt.target.classList.remove(invalidClass);
    }
  };

  var setFocus = function () {
    callbackNameInput.focus();
  };

  var changeTextInputHandler = function (evt) {
    if (evt.target.validity.valid) {
      evt.target.classList.add(validClass);
    } else if (evt.target.validity.invalid) {
      evt.target.classList.add(invalidClass);
    }

    if (evt.target.value === '' && evt.target.classList.contains(validClass)) {
      evt.target.classList.remove(validClass);
    }
  };

  var inputTextFieldHandler = function (evt) {
    if (evt.target.classList.contains(invalidClass)) {
      evt.target.classList.remove(invalidClass);
    }
  };

  var callbackAgreementInit = function () {
    callbackAgreement.setCustomValidity('Вы должны дать согласие на обработку персональных данных');
  };

  var callbackAgreementChangeHandler = function () {
    if (!callbackAgreement.checked) {
      callbackAgreementInit();
    } else {
      callbackAgreement.setCustomValidity('');
    }
  };

  var formReset = function () {
    callbackForm.reset();
    callbackNameInput.classList.remove(validClass);
    callbackTelInput.classList.remove(validClass);
    callbackAgreement.checked = false;
    callbackAgreementInit();
  };

  callbackNameInput.addEventListener('invalid', invalidTextFieldHandler);
  callbackNameInput.addEventListener('change', changeTextInputHandler);
  callbackNameInput.addEventListener('input', inputTextFieldHandler);

  phoneMask(callbackTelInput);
  callbackTelInput.addEventListener('invalid', invalidTextFieldHandler);
  callbackTelInput.addEventListener('change', changePhoneFieldHandler);
  callbackTelInput.addEventListener('input', inputTextFieldHandler);
  callbackAgreementInit();
  callbackAgreement.addEventListener('change', callbackAgreementChangeHandler);


  callbackForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!callbackAgreement.checked) {
      return;
    }

    formReset();
    window.popupCallback.close();
    window.popupSuccess.open();
  });

  window.callbacForm = {
    'setFocus': setFocus,
    'reset': formReset
  };
})();

(function () {
  var ECS_KEYCODE = 27;
  var popupSuccess = document.querySelector('.js--popup-success');
  var popupCloseButton = popupSuccess.querySelector('.popup__close');
  var popupOverlay = popupSuccess.querySelector('.popup__overlay');
  var popupConfirm = popupSuccess.querySelector('.popup__confirm-btn');

  var openPopup = function () {
    popupSuccess.classList.remove('popup--close');
    popupOverlay.addEventListener('click', overlayClickHandler);
    popupCloseButton.addEventListener('click', closeButtonClickHandler);
    popupConfirm.addEventListener('click', confirmBtnClickHandler);
    document.addEventListener('keydown', escPressHandler);
  };

  var closePopup = function () {
    popupSuccess.classList.add('popup--close');
    popupOverlay.removeEventListener('click', overlayClickHandler);
    popupCloseButton.removeEventListener('click', closeButtonClickHandler);
    document.removeEventListener('keydown', escPressHandler);
  };

  var overlayClickHandler = function () {
    closePopup();
  };

  var closeButtonClickHandler = function () {
    closePopup();
  };

  var confirmBtnClickHandler = function () {
    closePopup();
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ECS_KEYCODE) {
      closePopup();
    }
  };

  window.popupSuccess = {
    'open': openPopup,
    'close': closePopup
  };
})();

(function () {
  var programmToggler = document.querySelector('.tabs__togglers');

  var tabClickHandler = function (evt) {
    var target = evt.target.closest('.tabs__toggler');

    if (!target) {
      return;
    }

    if (!programmToggler.contains(target)) {
      return;
    }

    document.querySelector('.tabs__toggler--active').classList.remove('tabs__toggler--active');
    target.classList.add('tabs__toggler--active');
    programms.slideTo(target.dataset.index);
  };

  var programms = new window.SwiperJS('.tabs__list', {
    updateOnWindowResize: true,
    roundLengths: true,
    simulateTouch: false,
    centeredSlides: true
  });

  var togglers = new window.SwiperJS('.tabs__toggler-wrapper', {
    updateOnWindowResize: true,
    slideClass: 'tabs__toggler',
    slideActiveClass: 'tabs__toggler--active',
    wrapperClass: 'tabs__togglers',
    slideToClickedSlide: true,
    breakpoints: {
      280: {
        slidesPerView: 'auto',
        centeredSlides: true,
        virtualTranslate: false
      },
      769: {
        centeredSlides: false,
        virtualTranslate: true
      }
    }
  });

  programmToggler.addEventListener('click', tabClickHandler);
  togglers.controller.control = programms;
  programms.controller.control = togglers;
  programms.on('resize', function () {
    togglers.translateTo(0);
    togglers.update();
  });
})();
