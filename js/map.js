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
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;

var X_COORDINATES_MIN = 300;
var X_COORDIATES_MAX = 900;
var Y_COORDINATES_MIN = 150;
var Y_COORDINATES_MAX = 500;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;

function houseArray(count) {
  var offersArray = [];

  for (var i = 0; i < count; i++) {
    offersArray[i] = generateAdvertisment();
  }
  return offersArray;
}

function getRandom(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function shuffleArrayCondition() {
  return Math.random() - 0.5;
}

function shuffleArray(arr) {
  return arr.sort(shuffleArrayCondition);
}

function generateAdvertisment() {
  var randomNumber = getRandom(1, HOUSE_NUMBER);
  var adAvatar = randomNumber >= 10 ? randomNumber : '0' + randomNumber;
  var adTitle = HOUSE_TITLES[getRandom(0, HOUSE_TITLES.length - 1)];
  var adPrice = getRandom(PRICE_VALUE_MIN, PRICE_VALUE_MAX);
  var adType = HOUSE_TYPES[getRandom(0, HOUSE_TYPES.length - 1)];
  var adRooms = getRandom(1, ROOMS_NUMBER);
  var adGuests = getRandom(1, 100);
  var adCheckIn = CHECK_TIME_VARIANTS[getRandom(0, CHECK_TIME_VARIANTS.length - 1)];
  var adCheckOut = CHECK_TIME_VARIANTS[getRandom(0, CHECK_TIME_VARIANTS.length - 1)];
  var adFeatures = FEATURES.splice(0, getRandom(0, FEATURES.length - 1));
  var adPhotos = shuffleArray(PHOTOS);
  var adCoordinateX = getRandom(X_COORDINATES_MIN, X_COORDIATES_MAX);
  var adCoordinateY = getRandom(Y_COORDINATES_MIN, Y_COORDINATES_MAX);

  return {
    'author': {
      'avatar': AVATAR_IMAGE_URL + adAvatar + AVATAR_FORMAT
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
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

function createPin(locationX, locationY, title) {
  var newPin = document.createElement('button');
  newPin.className = 'map__pin';
  newPin.style = 'left: ' + locationX + 'px; ' + 'top: ' + locationY + 'px;';
  newPin.alt = title;
  return newPin;
}

function createPinAvatar(avatar) {
  var img = document.createElement('img');
  img.src = avatar;
  img.width = AVATAR_WIDTH;
  img.height = AVATAR_HEIGHT;
  img.draggable = false;
  img.alt = 'Метка объявления';
  return img;
}

function getDOMElements() {
  return {
    map: document.querySelector('.map'),
    pins: document.querySelector('.map__pins'),
    template: document.querySelector('template'),
    filters: document.querySelector('.map__filters-container'),
  };
}

function getDOMTemplatesElement(root) {
  return {
    mapCard: root.querySelector('.map__card'),
    avatar: root.querySelector('.popup__avatar'),
    title: root.querySelector('.popup__title'),
    address: root.querySelector('popup__text--address'),
    price: root.querySelector('.popup__text--price'),
    typeHouse: root.querySelector('.popup__type'),
    numberRoomsGuests: root.querySelector('.popup__text--capacity'),
    checkInCheckOut: root.querySelector('.popup__text--time'),
    popupFeatures: root.querySelector('.popup__features'),
    featureWifi: root.querySelector('.popup__feature--wifi'),
    featureDishwasher: root.querySelector('.popup__feature--dishwasher'),
    featureParking: root.querySelector('.popup__feature--parking'),
    featureWasher: root.querySelector('.popup__feature--washer'),
    featureElevator: root.querySelector('.popup__feature--elevator'),
    featureConditioner: root.querySelector('.popup__feature-conditioner'),
    description: root.querySelector('.popup__description'),
    photos: root.querySelector('.popup__photos')
  };
}

function renderPhotos(domList) {

  for (var i = 0; i < PHOTOS.length - 1; i++) {
    var photoElement = photoTemplate.cloneNode(true);
    var img = photoElement.querySelector('img');
    img.src = PHOTOS[i];
    img.width = PHOTO_WIDTH;
    img.height = PHOTO_HEIGHT;
    domList.appendChild(photoElement);
  }
}



