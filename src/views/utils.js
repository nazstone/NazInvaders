import { setPrefCity } from '../reducer/pref.action';
import { setPref } from '../repo/db';

const onPressSelectCity = (navigation, city, dispatch) => {
  return async () => {
    await setPref({ city: city.name });
    dispatch(setPrefCity(city));
    if (navigation) {
      navigation.popToTop();
    }
  };
};

const intToBool = (v) => v === 1;
const boolToInt = (v) => (v ? 1 : 0);

export { onPressSelectCity, intToBool, boolToInt };
