import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';

import { flex1 } from '../utils/style';
import { searchPlace } from '../service/searchPlace';
import { text } from '../utils/font';
import { savePin } from '../repo/db';
import Text from './components/Text';
import Button from './components/Button';

const styleSelectedPoint = {
  flexDirection: 'row',
  padding: 10,
  justifyContent: 'space-around',
};

const styleTextNotifMap = {
  ...text,
  position: 'absolute',
  backgroundColor: '#1e1e1e1e',
  width: '100%',
  textAlign: 'center',
};
const Map = ({ route, navigation }) => {
  const mapRef = useRef(null);
  const { item } = (route && route.params) || null;

  const [message, setMessage] = useState(null);
  const [coordinateTmp, setCoordinateTmp] = useState(null);

  useEffect(() => {
    if (!item.pin) {
      setMessage(`Looking for '${item.city}`);
      searchPlace(item.city).then((t) => {
        setMessage('Going to the location');
        mapRef.current.animateToRegion(
          {
            longitude: t.lon,
            latitude: t.lat,
            latitudeDelta: 1,
            longitudeDelta: 1,
          },
          500
        );
        setTimeout(() => setMessage(null), 500);
      });
    } else {
      setMessage(`Looking for '${item.name}`);
      mapRef.current.animateToRegion(
        {
          ...JSON.parse(item.pin),
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        500
      );
      setTimeout(() => setMessage(null), 500);
    }
  }, [item]);

  const savePinClick = async () => {
    await savePin({ ...item, pin: JSON.stringify(coordinateTmp) });
    navigation.goBack();
  };

  // const urlTemplate="http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
  // const urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // const urlTemplate="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"

  return (
    <View style={flex1}>
      <MapView
        ref={mapRef}
        style={flex1}
        onLongPress={(e) => {
          setCoordinateTmp(e.nativeEvent.coordinate);
        }}
      >
        {coordinateTmp && (
          <Marker
            coordinate={coordinateTmp}
            title={item.name}
            description={item.city}
          />
        )}
        {item.pin && (
          <Marker
            coordinate={JSON.parse(item.pin)}
            title={item.name}
            description={item.city}
          />
        )}
      </MapView>
      {message && <Text style={styleTextNotifMap}>{message}</Text>}
      {!coordinateTmp && (
        <Button onPress={() => navigation.goBack()} title="Cancel" />
      )}
      {coordinateTmp && (
        <View style={styleSelectedPoint}>
          <Button onPress={async () => savePinClick()} title="Validate" />
          <Button onPress={() => setCoordinateTmp(null)} title="Cancel" />
        </View>
      )}
    </View>
  );
};

export default Map;
