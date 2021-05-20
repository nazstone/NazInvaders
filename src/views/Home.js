import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from './List';
import Detail from './Detail';
import { Image } from 'react-native';
import { title } from '../utils/font';
import MapPlacePin from './MapPlacePin';
import Text from './components/Text';
import { fontFamily } from '../utils/style';

const Stack = createStackNavigator();

const style = {
  height: 50,
  width: 50,
};
const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerTitleStyle: {
          ...fontFamily,
        },
      }}
    >
      <Stack.Screen
        name="Invaders"
        component={List}
        options={({ navigation }) => ({
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
          headerRight: () => (
            <Image
              style={style}
              resizeMode="center"
              onTouchEnd={() => {
                navigation.jumpTo('Map');
              }}
              source={require('../../assets/img/map.png')}
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
