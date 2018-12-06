'use strict';

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

var avatar = [];
for (var i = 1; i < 9; i++) {
  avatar.push('img/avatar/user0' + i + '.png');
}

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

var addressXY = [];
for (i = 1; i < 9; i++) {
  addressXY.push({
    x: locationX(),
    y: locationY()
  });
}

// Массив из 8 объектов размещения(объявлений)
var ads = [];
for (i = 0; i < 8; i++) {
  ads.push({
    avatar: avatar[i],
    title: TITLE[i],
    address: addressXY[i],
    price: randomPrice(),
    rooms: randomRooms(),
    guests: randomGuests(),
    type: TYPE[Math.floor(Math.random() * TYPE.length)],
    checkin: CHECKIN[Math.floor(Math.random() * CHECKIN.length)],
    // checkout: ads[i].checkin,
    checkout: CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)],
    features: FEATURES,
    description: null,
    photos: PHOTOS,
    x: locationX(),
    y: locationY()
  });
}
