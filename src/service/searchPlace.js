const jsonPlace = require('../../assets/json/place.json');

const getPlaces = (k) => {
  return jsonPlace[k];
};

export { getPlaces };
