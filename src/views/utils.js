import { setPrefCity } from '../reducer/pref.action';
import { setPref } from '../repo/db';

const onPressSelectCity = (navigation, city, dispatch) => {
  return async () => {
    await setPref({ city: city.name });
    dispatch(setPrefCity(city));
    if (navigation) {
      navigation.goBack();
    }
  };
};

export { onPressSelectCity };
