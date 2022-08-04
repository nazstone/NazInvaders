import React, { useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { ImageBackground, View } from 'react-native';

import { flex1 } from '../utils/style';
import { getPlaces } from '../service/searchPlace';
import { getCities } from '../repo/db';
import { useDispatch } from 'react-redux';
import { onPressSelectCity } from './utils';
import Button from './components/Button';

const styleBackground = { width: 30, height: 30 };

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
      >
        <ImageBackground
          style={styleBackground}
          source={require('../../assets/img/invaders_pin.png')}
        />
      </Marker>
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
        clusterColor="#f00"
      >
        {/* <UrlTile
          urlTemplate={'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          maximumZ={19}
        /> */}
        {markers}
      </MapView>
      <Button onPress={() => navigation.goBack()} title="Cancel" />
    </View>
  );
};

export default Map;
