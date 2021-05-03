import React, { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import { useDispatch } from 'react-redux';

import { cities, setPref } from '../repo/db';
import { setPrefCity } from '../reducer/pref.action';
import { text } from '../utils/font';
import { flex1 } from '../utils/style';

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
  const onPress = async () => {
    await setPref({ city: city.name });
    dispatch(setPrefCity(city));
    navigation.goBack();
  };
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

const CityView = ({ navigation }) => {
  const [cityRow, setCityRow] = useState({});

  useEffect(() => {
    cities(setCityRow);
  }, []);

  let counter = 0;
  const citiesViewArr = [];
  if (cityRow.length > 0) {
    for (let i = 0; i < cityRow.length; i += 1) {
      const cityObj = cityRow.item(i);
      counter += cityObj.count;
      citiesViewArr.push(
        <City city={cityObj} key={cityObj.name} navigation={navigation} />
      );
    }
  }

  const all = {
    name: '',
    count: counter,
  };

  return (
    <View style={flex1}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <City city={all} navigation={navigation} />
        {citiesViewArr}
      </ScrollView>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

export default CityView;
