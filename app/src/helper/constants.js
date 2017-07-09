const API = {
  HOST: 'http://localhost:',
  PORT: '8082',
  KEY_GOOGLE: 'AIzaSyBs58UtfzuFN0IfkzKW_3b5WPG6CwCEHGI',
  LANGUADGE: 'en'
};

const CONTACTDATA = {
  'Khrystyna Ivanchenko': ' +38-097-782-33-55',
  'Taras Petrenenko': ' +38-063-346-32-47',
  '79018, Lviv, Fedkovycha Str.60A, block C': ' dami.suppor@gmail.com'
};

const MAPDATA ={
  ZOOM: 17,
  NAME: 'Soft Serve',
  LAT: 49.832765,
  LNG: 23.997014,
  HEIGTH: '280px'
};

API.URL = API.HOST + API.PORT;

export { API, CONTACTDATA, MAPDATA };
