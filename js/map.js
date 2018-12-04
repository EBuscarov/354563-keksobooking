'use strict';

var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var LOCATION_X = 600;
var LOCATION_Y = 350;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var randomPrice = function () {
  return Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE + 1) + MIN_PRICE);
};

var randomRooms = function () {
  return Math.floor(Math.random() * (MAX_ROOMS - MIN_ROOMS + 1) + MIN_ROOMS);
};

var randomGuest = randomRooms;

var ads = [];

var author = {};
author.avatar = avatar;
var avatar = [];
for (var i = 1; i < 9; i++) {
  avatar.push('img/avatar/user0' + i + '.png');
}

var offer = {};
offer.title = TITLE;
offer.address = [LOCATION_X, LOCATION_Y];
offer.price = randomPrice(MIN_PRICE, MAX_PRICE);
offer.type = TYPE;
offer.room = randomRooms(MIN_ROOMS, MAX_ROOMS);
offer.guest = randomGuest;
offer.checkin = CHECKIN;
offer.checkout = CHECKOUT;
offer.features = FEATURES;
offer.description = null;
offer.photos = PHOTOS;

var location = {};
location.x = LOCATION_X;
location.y = LOCATION_Y;

ads.push(author, offer, location);
