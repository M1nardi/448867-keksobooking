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
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var X_COORDINATES_MIN = 300;
var X_COORDIATES_MAX = 900;
var Y_COORDINATES_MIN = 150;
var Y_COORDINATES_MAX = 500;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var houseArray;

function getRandom(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getAvatarImage() {
  var avatarImage = AVATAR_IMAGE_URL + '0' + getRandom(1, HOUSE_NUMBER) + AVATAR_FORMAT;
  return avatarImage;
}


function shuffleArrayCondition() {
  return Math.random() - 0.5;
}

function shuffleArray(arr) {
  return arr.sort(shuffleArrayCondition);
}

var generateAdvertisment = function () {
  var adAvatar = getAvatarImage();
  var adTitle = HOUSE_TITLES[getRandom(0, HOUSE_TITLES.length - 1)];
  var adPrice = getRandom(PRICE_VALUE_MIN, PRICE_VALUE_MAX);
  var adType = HOUSE_TYPES[getRandom(0, HOUSE_TYPES.length - 1)];
  var adRooms = getRandom(1, ROOMS_NUMBER);
  var adGuests = getRandom(1, 100);
  var adCheckIn = CHECK_TIME_VARIANTS[getRandom(0, CHECK_TIME_VARIANTS.length - 1)];
  var adCheckOut = CHECK_TIME_VARIANTS[getRandom(0, CHECK_TIME_VARIANTS.length - 1)];
  var adFeatures = FEATURES[getRandom(0, FEATURES.length - 1)];
  var adPhotos = shuffleArray(PHOTOS);
  var adCoordinateX = getRandom(X_COORDINATES_MIN, X_COORDIATES_MAX);
  var adCoordinateY = getRandom(Y_COORDINATES_MIN, Y_COORDINATES_MAX);

  return {
    'author': {
      'avatar': adAvatar
    },
    'offer': {
      'title': adTitle,
      'address': adCoordinateX + ', ' + adCoordinateY,
      'price': adPrice,
      'type': adType,
      'rooms': adRooms,
      'guests': adGuests,
      'checkin': adCheckIn,
      'checkout': adCheckOut,
      'features': adFeatures,
      'description': '',
      'photos': adPhotos
    },

    'location': {
      'x': adCoordinateX,
      'y': adCoordinateY
    }
  };
};

function generateArray(count) {
  houseArray = [];

  for (var i = 0; i < count; i++) {
    houseArray[i] = generateAdvertisment();
  }
  return houseArray;
}

generateArray(HOUSE_NUMBER);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

function createPin(locationX, locationY, title) {
  var newPin = document.createElement('button');
  newPin.className = 'map__pin';
  newPin.style = 'left: ' + locationX + 'px; ' + 'top: ' + locationY + 'px;';
  newPin.alt = title;
  return newPin;
}

function createMapPins() {
  var pins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < HOUSE_NUMBER; i++) {
    fragment.appendChild(createPin(houseArray[i].location.x, houseArray[i].location.y));
  }

  pins.appendChild(fragment);
}

createMapPins();
