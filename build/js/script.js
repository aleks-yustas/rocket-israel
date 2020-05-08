'use strict';

(function () {
  var popupCallback = document.querySelector('.js--popup-callback');
  var callbackLinkOpen = document.querySelector('.hero__callback');
  var popupCloseButton = popupCallback.querySelector('.popup__close');
  var popupOverlay = popupCallback.querySelector('.popup__overlay');

  var openPopup = function () {
    popupCallback.classList.remove('popup--close');
  };

  var closePopup = function () {
    popupCallback.classList.add('popup--close');
  };

  var callbackLinkClickHandler = function (evt) {
    evt.preventDefault();
    openPopup();
    popupOverlay.addEventListener('click', overlayClickHandler);
    popupCloseButton.addEventListener('click', closeButtonClickHandler);
  };

  var overlayClickHandler = function () {
    closePopup();
    popupOverlay.removeEventListener('click', overlayClickHandler);
    popupCloseButton.removeEventListener('click', closeButtonClickHandler);
  };

  var closeButtonClickHandler = function () {
    closePopup();
    popupOverlay.removeEventListener('click', overlayClickHandler);
    popupCloseButton.removeEventListener('click', closeButtonClickHandler);
  };

  callbackLinkOpen.addEventListener('click', callbackLinkClickHandler);
})();
