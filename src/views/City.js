import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { getCities } from '../repo/db';
import { flex1 } from '../utils/style';
import Button from './components/Button';
import CityItem from './components/city.item';

const CityView = ({ navigation }) => {
  const [cityRow, setCityRow] = useState({});

  useEffect(() => {
    getCities().then(setCityRow);
  }, []);

  let counter = 0;
  const citiesViewArr = [];
  if (cityRow.length > 0) {
    for (let i = 0; i < cityRow.length; i += 1) {
      const cityObj = cityRow.item(i);
      counter += cityObj.count;
      citiesViewArr.push(
        <CityItem city={cityObj} key={cityObj.name} navigation={navigation} />
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
        <CityItem city={all} navigation={navigation} />
        {citiesViewArr}
      </ScrollView>
      <Button onPress={() => navigation.goBack()} title="Cancel" />
    </View>
  );
};

export default CityView;
