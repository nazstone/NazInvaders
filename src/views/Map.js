import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import { Button, View } from 'react-native';

import { flex1 } from '../utils/style';
import { getPlaces } from '../service/searchPlace';
import { getCities } from '../repo/db';
import { useDispatch } from 'react-redux';
import { onPressSelectCity } from './utils';

const Map = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const launch = async () => {
      const placesDb = await getPlaces();
      const citiesDb = await getCities();
      setPlaces(
        placesDb.map((d) => {
          let count = 0;
          for (let j = 0; j < citiesDb.length; j += 1) {
            const ctmp = citiesDb.item(j);
            if (ctmp.name === d.name) {
              count = ctmp.count;
              break;
            }
          }
          return { ...d, count };
        })
      );
    };
    launch();
  }, []);

  const markers =
    places &&
    places.length > 0 &&
    places.map((d) => (
      <Marker
        key={d.name.replace(/ /g, '_')}
        coordinate={{ longitude: d.location.lng, latitude: d.location.lat }}
        title={d.name}
        onCalloutPress={onPressSelectCity(navigation, d, dispatch)}
        description={(d.count && `${d.count} invaders`) || ''}
      />
    ));

  return (
    <View style={flex1}>
      <MapView style={flex1}>{markers}</MapView>
      <Button onPress={() => navigation.goBack()} title="Cancel" />
    </View>
  );
};

export default Map;
