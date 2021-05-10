import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from './List';
import Detail from './Detail';
import { Image, Text } from 'react-native';
import { title } from '../utils/font';
import MapPlacePin from './MapPlacePin';

const Stack = createStackNavigator();

const style = {
  height: 50,
  width: 50,
};
const Home = () => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="Invaders"
        component={List}
        options={({ navigation, route }) => ({
          headerTitle: (props) => {
            return <Text style={title}>{props.children}</Text>;
          },
          headerLeft: () => (
            <Image
              style={style}
              resizeMode="center"
              onTouchEnd={() => {
                navigation.openDrawer();
              }}
              source={require('../../assets/img/menu.png')}
            />
          ),
        })}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Map" component={MapPlacePin} />
    </Stack.Navigator>
  );
};

export default Home;
