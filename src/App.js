import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { fontFamily, theme } from './utils/style';
import List from './views/List';
import Map from './views/Map';
import About from './views/About';
import Detail from './views/Detail';
import City from './views/City';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import prefReduce from './reducer/pref.reduce';

import { init } from './repo/db';

init();
const Stack = createStackNavigator();
const store = createStore(prefReduce);

export default function App() {
  const style = {
    height: 50,
    width: 50,
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="List"
          screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
              ...fontFamily,
            },
          }}
        >
          <Stack.Screen
            name="List"
            component={List}
            options={({ navigation }) => ({
              title: 'Invaders',
              headerRight: () => (
                <Image
                  style={style}
                  resizeMode="center"
                  onTouchEnd={() => {
                    navigation.navigate('Map');
                  }}
                  source={require('../assets/img/map.png')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={({ route }) => ({
              title: route.params.item.name || 'Detail',
            })}
          />
          <Stack.Screen
            name="CityList"
            component={City}
            options={{
              title: 'List of cities',
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: 'Map',
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="Help"
            component={About}
            options={{
              title: 'Help',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
