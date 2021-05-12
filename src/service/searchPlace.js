import AppMetadata from '../utils/app.metadata';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'cache_maps_query_place_';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`${KEY}${key}`, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${KEY}${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const getPlaces = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    keys = keys.filter((k) => k.indexOf(KEY) >= 0);
    const r = await Promise.all(
      keys.map(async (k) => {
        let location = null;
        const jsonValue = await AsyncStorage.getItem(k);
        if (jsonValue) {
          const tmpJson = JSON.parse(jsonValue);
          location = tmpJson.geometry.location;
        }
        return {
          name: k.substr(KEY.length),
          location,
        };
      })
    );
    return r;
  } catch (e) {
    console.error('get places', e);
  }
};

const searchPlace = async (input) => {
  const place = await getData(input);
  if (place) {
    return place.geometry.location;
  }
  try {
    const key = await AppMetadata.getAppMetadataBy(
      'com.google.android.geo.API_KEY'
    );
    // precise city in query to avoid some weird response like barcelona in france
    const cityName = input.split(' - ')[0];
    const queryRest = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityName}%20city&key=${key}`;
    const response = await fetch(queryRest);
    const json = await response.json();
    await storeData(input, json.results[0]);
    return json.results[0].geometry.location;
  } catch (error) {
    console.error(error, input);
  }
};

export { searchPlace, getPlaces };
