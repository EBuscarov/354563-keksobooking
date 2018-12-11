'use strict';

var OBJECTS = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;

var randomPrice = function () {
  return Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE + 1) + MIN_PRICE);
};

var randomRooms = function () {
  return Math.floor(Math.random() * (MAX_ROOMS - MIN_ROOMS + 1) + MIN_ROOMS);
};

var randomGuests = function () {
  return Math.floor(Math.random() * (randomRooms() - MIN_ROOMS + 1) + MIN_ROOMS);
};

var locationX = function () {
  return Math.floor(Math.random() * (MAX_X - MIN_X + 1) + MIN_X);
};

var locationY = function () {
  return Math.floor(Math.random() * (MAX_Y - MIN_Y + 1) + MIN_Y);
};

// Массив из 8 объектов
var ads = [];
for (var i = 0; i < OBJECTS; i++) {
  ads.push({
    author: {
      avatar: 'img/avatar/user0' + i + '.png'
    },
    offer: {
      title: TITLE[Math.floor(Math.random() * TITLE.length)],
      address: location.x + ', ' + location.y,
      price: randomPrice(),
      rooms: randomRooms(),
      guests: randomGuests(),
      type: TYPE[Math.floor(Math.random() * TYPE.length)],
      checkin: CHECKIN[Math.floor(Math.random() * CHECKIN.length)],
      checkout: CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)],
      features: FEATURES,
      description: null,
      photos: PHOTOS,
    },
    location: {
      x: locationX(),
      y: locationY()
    }
  });
  ads[i].offer.address = ads[i].location.x + ', ' + ads[i].location.y;
}

// Удаляем класс .map--faded
var switchMap = document.querySelector('.map');
switchMap.classList.remove('map--faded');

// Создаем метки на карте
var pinListElement = document.querySelector('.map__pins');
var pinMapTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderPin = function () {
  var pinElement = pinMapTemplate.cloneNode(true);

  pinElement.style.left = location.x + 'px';
  pinElement.style.top = location.y + 'px';
  pinElement.src = ads[i].author.avatar[i];
  pinElement.alt = ads[i].offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}
pinListElement.appendChild(fragment);
