import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/Profile';
import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../constants';

const ProfileStack = createStackNavigator();
const ProfileRoutes: React.FC = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: DARK_TEXT_COLOR,
      headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
      cardStyle: { backgroundColor: BACKGROUND_COLOR },
    }}
  >
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileRoutes;
