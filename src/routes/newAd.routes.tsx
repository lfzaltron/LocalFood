import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewAd from '../pages/NewAd';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../constants';

const NewAdStack = createStackNavigator();

const NewAdRoutes: React.FC = () => (
  <NewAdStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: DARK_TEXT_COLOR,
      headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
      cardStyle: { backgroundColor: BACKGROUND_COLOR },
    }}
  >
    <NewAdStack.Screen
      name="NewAd"
      component={NewAd}
      options={{ title: 'Novo anúncio' }}
    />
  </NewAdStack.Navigator>
);

export default NewAdRoutes;
