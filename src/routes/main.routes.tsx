import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from '../pages/List';
import AdDetail from '../pages/AdDetail';
import Seller from '../pages/Seller';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../constants';

const Main = createStackNavigator();

const MainRoutes: React.FC = () => (
  <Main.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: DARK_TEXT_COLOR,
      headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
      cardStyle: { backgroundColor: BACKGROUND_COLOR },
    }}
  >
    <Main.Screen name="List" component={List} />
    <Main.Screen
      name="AdDetail"
      component={AdDetail}
      options={{ headerShown: true, title: '' }}
    />
    <Main.Screen
      name="Seller"
      component={Seller}
      options={{ headerShown: true, title: '' }}
    />
  </Main.Navigator>
);

export default MainRoutes;
