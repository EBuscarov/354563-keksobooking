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
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
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

// Отоброжаем метки на карте
var pinListElement = document.querySelector('.map__pins');
var pinMapTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderPin = function () {
  var pinElement = pinMapTemplate.cloneNode(true);

  pinElement.style.left = ads[i].location.x + 'px';
  pinElement.style.top = ads[i].location.y + 'px';
  pinElement.querySelector('img').src = ads[i].author.avatar;
  pinElement.querySelector('img').alt = ads[i].offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}
pinListElement.appendChild(fragment);

// Отоброжаем карточку объявления
var cardListElement = document.querySelector('.map');
var blockListElement = document.querySelector('.map__filters-container');
var cardMapTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var HOUSING_NAMES = {
  palace: 'Дворец',
  flat: 'Кваритира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var renderCard = function (ad) {
  var cardElement = cardMapTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HOUSING_NAMES[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + 'комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = ad.offer.features.join(', ');
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  // Отображаем фотографии в карточке объявления
  var photoListElement = cardElement.querySelector('.popup__photos');
  var photoTemplate = cardElement.querySelector('.popup__photo');
  var photoElement = photoListElement.removeChild(photoTemplate);

  for (var j = 0; j < ads[j].offer.photos.length; j++) {
    var offer = ad.offer;
    photoElement = photoTemplate.cloneNode(true);
    photoElement.src = offer.photos[j];
    photoListElement.appendChild(photoElement);
  }

  return cardElement;
};

fragment = document.createDocumentFragment();
fragment.appendChild(renderCard(ads[0]));
cardListElement.insertBefore(fragment, blockListElement);
