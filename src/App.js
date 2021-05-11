import 'react-native-gesture-handler';
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { getCities, init } from './repo/db';

import CityView from './views/City';
import prefReduce from './reducer/pref.reduce';
import Home from './views/Home';
import AboutView from './views/About';
import Map from './views/Map';
import { searchPlace } from './service/searchPlace';

init();
const Drawer = createDrawerNavigator();
const store = createStore(prefReduce);

const fetchingPlace = () =>
  new Promise(async (resolve) => {
    const res = await getCities();
    for (let i = 0; i < res.length; i += 1) {
      await searchPlace(res.item(i).name);
    }
    resolve();
  });
fetchingPlace();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="City" component={CityView} />
          <Drawer.Screen name="Map" component={Map} />
          <Drawer.Screen name="About" component={AboutView} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
