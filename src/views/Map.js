import React, { useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { ImageBackground, Text, View } from 'react-native';

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

  const widthHeight = 40;
  const widthStyle = {
    width: widthHeight,
    height: widthHeight,
  };
  const textStyle = {
    ...widthStyle,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  };

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
        // clusterColor="#f00"
        renderCluster={(cluster) => {
          const { id, geometry, onPress, properties } = cluster;
          const points = properties.point_count;

          return (
            <Marker
              key={`cluster-${id}`}
              coordinate={{
                longitude: geometry.coordinates[0],
                latitude: geometry.coordinates[1],
              }}
              style={widthStyle}
              onPress={onPress}
            >
              <ImageBackground
                style={widthStyle}
                source={require('../../assets/img/invaders_cluster.png')}
              >
                <Text style={textStyle}>{points}</Text>
              </ImageBackground>
            </Marker>
          );
        }}
      >
        {markers}
      </MapView>
      <Button
        onPress={() => navigation.navigate('CityList')}
        title="List of cities"
      />
    </View>
  );
};

export default Map;
