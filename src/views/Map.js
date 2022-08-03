import React, { useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { View } from 'react-native';

import { flex1 } from '../utils/style';
import { getPlaces } from '../service/searchPlace';
import { getCities } from '../repo/db';
import { useDispatch } from 'react-redux';
import { onPressSelectCity } from './utils';
import Button from './components/Button';

const Map = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const launch = async () => {
      const citiesDb = await getCities();
      const placesTmp = [];
      for (let j = 0; j < citiesDb.length; j += 1) {
        const ctmp = citiesDb.item(j);
        const location = getPlaces(ctmp.name);
        if (location) {
          placesTmp.push({
            name: ctmp.name,
            count: ctmp.count,
            location,
          });
        } else {
          console.log('missing location for ', ctmp.name);
        }
      }
      setPlaces(placesTmp);
    };
    launch();
  }, []);

  const markers =
    places &&
    places.length > 0 &&
    places.map((d) => (
      <Marker
        key={d.name.replace(/ /g, '_')}
        coordinate={{
          longitude: parseFloat(d.location.lon),
          latitude: parseFloat(d.location.lat),
          longitudeDelta: 0,
          latitudeDelta: 0,
        }}
        title={d.name}
        onCalloutPress={onPressSelectCity(navigation, d, dispatch)}
        description={(d.count && `${d.count} invaders`) || ''}
      />
    ));

  return (
    <View style={flex1}>
      <MapView
        style={flex1}
        initialRegion={{
          longitude: 2.1,
          latitude: 40.1,
          longitudeDelta: 30,
          latitudeDelta: 30,
        }}
      >
        {markers}
      </MapView>
      {/* <MapView
        initialRegion={{
          latitude: 24.133765,
          longitude: 90.198258,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        mapType={Platform.OS === 'android' ? 'none' : 'standard'}
        // provider={null}
        // rotateEnabled={false}
        // zoomEnabled={false}
        style={{ ...flex1, backgroundColor: 'red' }}
      >
        {/* <UrlTile
          urlTemplate="https://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
          shouldReplaceMapContent={true}
          maximumZ={9}
          flipY={false}
        />
      </MapView> */}
      <Button onPress={() => navigation.goBack()} title="Cancel" />
    </View>
  );
};

export default Map;
