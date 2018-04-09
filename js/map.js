'use strict';

var HOUSE_NUMBER = 8;

var AVATAR_IMAGE_URL = 'img/avatars/user';
var AVATAR_FORMAT = '.png';

var HOUSE_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var ROOMS_NUMBER = 5;

var PRICE_VALUE_MIN = 1000;
var PRICE_VALUE_MAX = 1000000;

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECK_TIME_VARIANTS = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

var X_COORDINATES_MIN = 300;
var X_COORDIATES_MAX = 900;
var Y_COORDINATES_MIN = 150;
var Y_COORDINATES_MAX = 500;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getAvatarImage = function() {
  var avatarImage = AVATAR_IMAGE_URL + '0' + getRandom(1, 8) + AVATAR_FORMAT;
  return avatarImage;
};
