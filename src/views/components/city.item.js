import React from 'react';
import { View, TouchableHighlight } from 'react-native';

import { useDispatch } from 'react-redux';

import { text } from '../../utils/font';
import { onPressSelectCity } from '../utils';
import Text from './Text';

const style = {
  ...text,
  marginLeft: 20,
  marginRight: 20,
  marginTop: 10,
  marginBottom: 5,
  paddingTop: 5,
};

const cityLayout = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const separator = {
  borderTopWidth: 1,
  height: 2,
  marginLeft: 20,
  marginRight: 20,
  backgroundColor: 'lightgray',
};

const City = ({ city, navigation }) => {
  const dispatch = useDispatch();
  const onPress = onPressSelectCity(navigation, city, dispatch);
  return (
    <TouchableHighlight onPress={onPress} underlayColor="gray">
      <View>
        <View style={separator} />
        <View style={cityLayout}>
          <Text style={style}>{city.name || 'Around the world'}</Text>
          <Text style={style}>{city.count}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default City;
