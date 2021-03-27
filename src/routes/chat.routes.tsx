import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import ChatsList from '../pages/ChatsList';
import ChatMessages from '../pages/ChatMessages';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../constants';

const Chat = createStackNavigator();

const ChatRoutes: React.FC = () => (
  <Chat.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: DARK_TEXT_COLOR,
      headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
      cardStyle: { backgroundColor: BACKGROUND_COLOR },
    }}
  >
    <Chat.Screen
      name="ChatsList"
      component={ChatsList}
      options={{ headerTitle: () => <Header>Conversas</Header> }}
    />
    <Chat.Screen
      name="ChatMessages"
      component={ChatMessages}
      options={{ headerShown: true, title: '' }}
    />
  </Chat.Navigator>
);

export default ChatRoutes;
