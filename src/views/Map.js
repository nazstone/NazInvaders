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
        keys={d.name.replace(/ /g, '_')}
        coordinate={{ longitude: d.location.lng, latitude: d.location.lat }}
        title={d.name}
        onCalloutPress={onPressSelectCity(navigation, d, dispatch)}
        description={(d.count && `Count of invaders: ${d.count}`) || ''}
      />
    ));

  // const urlTemplate="http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
  // const urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // const urlTemplate="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
  return (
    <View style={flex1}>
      <MapView style={flex1}>{markers}</MapView>
      <Button onPress={() => navigation.goBack()} title="Cancel" />
    </View>
  );
};

export default Map;
