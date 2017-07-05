const API = {
  HOST: 'http://localhost:',
  PORT: '8082',
  KEY_GOOGLE: 'AIzaSyBs58UtfzuFN0IfkzKW_3b5WPG6CwCEHGI',
  LANGUADGE: 'en'
};

const CONTACTDATA = {
  PHONE1: '+38-097-782-33-55',
  PHONE2: '+38-063-346-32-47',
  MAIL: ' dami.suppor@gmail.com',
  MANADGER1: 'Khrystyna Ivanchenko',
  MANADGER2: 'Taras Petrenenko',
  POST: '79018, Lviv',
  ADDRESS: 'Fedkovycha Str.60A, block C'
}

const MAPDATA ={
  ZOOM: 17,
  NAME: 'Soft Serve',
  LAT: 49.832765,
  LNG: 23.997014,
  HEIGTH: '280px'
}

API.URL = API.HOST + API.PORT;

export { API, CONTACTDATA, MAPDATA };
