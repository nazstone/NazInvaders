import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, UrlTile } from 'react-native-maps';
import { Button, View } from 'react-native';

import { flex1 } from '../utils/style';

const Map = ({ route, navigation }) => {
  // const urlTemplate="http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
  // const urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // const urlTemplate="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
  return (
    <View style={flex1}>
      <MapView style={flex1}></MapView>
      <Button onPress={() => navigation.goBack()} title="Cancel" />
    </View>
  );
};

export default Map;
