'use strict';

var ADS_OBJECT = 8;
var ADS_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var ADS_CHECKIN = ['12:00', '13:00', '14:00'];
var ADS_CHECKOUT = ['12:00', '13:00', '14:00'];
var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var HOUSING_NAMES = {
  palace: 'Дворец',
  flat: 'Кваритира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomGuests = function () {
  return Math.floor(Math.random() * (getRandomInt(MIN_ROOMS, MAX_ROOMS) - MIN_ROOMS + 1) + MIN_ROOMS);
};

var getRandomElement = function (array) {
  var indexArray = Math.floor(Math.random() * array.length);
  return array[indexArray];
};

// Массив из 8 объектов
var ads = [];
for (var i = 0; i < ADS_OBJECT; i++) {
  ads.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: getRandomElement(ADS_TITLE),
      address: null,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomGuests(),
      type: getRandomElement(ADS_TYPE),
      checkin: getRandomElement(ADS_CHECKIN),
      checkout: getRandomElement(ADS_CHECKOUT),
      features: ADS_FEATURES,
      description: null,
      photos: ADS_PHOTOS,
    },
    location: {
      x: getRandomInt(MIN_X, MAX_X),
      y: getRandomInt(MIN_Y, MAX_Y)
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

var renderPin = function (dataPin) {
  var pinElement = pinMapTemplate.cloneNode(true);

  pinElement.style.left = dataPin.location.x + 'px';
  pinElement.style.top = dataPin.location.y + 'px';
  pinElement.querySelector('img').src = dataPin.author.avatar;
  pinElement.querySelector('img').alt = dataPin.offer.title;

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

var renderCard = function (dataCard) {
  var cardElement = cardMapTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = dataCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = dataCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = dataCard.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HOUSING_NAMES[dataCard.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = dataCard.offer.rooms + ' комнаты для ' + dataCard.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataCard.offer.checkin + ', выезд до ' + dataCard.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = dataCard.offer.features.join(', ');
  cardElement.querySelector('.popup__description').textContent = dataCard.offer.description;

  cardElement.querySelector('.popup__avatar').src = dataCard.author.avatar;

  // Отображаем фотографии в карточке объявления
  var photoListElement = cardElement.querySelector('.popup__photos');
  var photoTemplate = cardElement.querySelector('.popup__photo');
  var photoElement = photoListElement.removeChild(photoTemplate);

  for (var j = 0; j < dataCard.offer.photos.length; j++) {
    photoElement = photoTemplate.cloneNode(true);
    photoElement.src = dataCard.offer.photos[j];
    photoListElement.appendChild(photoElement);
  }

  return cardElement;
};

fragment = document.createDocumentFragment();
fragment.appendChild(renderCard(ads[0]));
cardListElement.insertBefore(fragment, blockListElement);
