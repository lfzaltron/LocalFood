import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../hooks/auth';

import Auth from './auth.routes';
import Chats from './chat.routes';
import Main from './main.routes';
import NewAd from './newAd.routes';
import Profile from './profile.routes';

import {
  BACKGROUND_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
} from '../constants';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'List') {
            iconName = 'list';
          } else if (route.name === 'Chats') {
            iconName = 'message-circle';
          } else if (route.name === 'Profile') {
            iconName = !user ? 'log-in' : 'user';
          } else if (route.name === 'NewAd') {
            iconName = 'plus';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveTintColor: NORMAL_TEXT_COLOR,
        activeTintColor: HIGHLIGHT_COLOR,
        activeBackgroundColor: LIGHT_HIGHLIGHT_COLOR,
        inactiveBackgroundColor: BACKGROUND_COLOR,
        style: { backgroundColor: BACKGROUND_COLOR },
        showLabel: false,
      }}
    >
      <Tab.Screen name="List" component={Main} />
      {!user && (
        <>
          <Tab.Screen name="Chats" component={Auth} />
          <Tab.Screen name="NewAd" component={Auth} />
          <Tab.Screen name="Profile" component={Auth} />
        </>
      )}
      {!!user && (
        <>
          <Tab.Screen name="Chats" component={Chats} />
          <Tab.Screen name="NewAd" component={NewAd} />
          <Tab.Screen name="Profile" component={Profile} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabRoutes;
