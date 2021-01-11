import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { BACKGROUND_COLOR } from '../constants';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      // headerShown: false,
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#7159c1' },
      cardStyle: { backgroundColor: BACKGROUND_COLOR },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
