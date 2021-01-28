import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../hooks/auth';
import Tab from './tabs.routes';

import Filters from '../pages/Filters';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../constants';

const Modal = createStackNavigator();

const ModalRoutes: React.FC = () => {
  return (
    <Modal.Navigator
      mode="modal"
      screenOptions={{
        headerShown: true,
        headerTintColor: DARK_TEXT_COLOR,
        headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
        headerBackTitleVisible: false,
      }}
    >
      <Modal.Screen
        name="Tab"
        component={Tab}
        options={{ headerShown: false }}
      />
      <Modal.Screen
        name="Filters"
        component={Filters}
        options={{ title: 'Filtros' }}
      />
    </Modal.Navigator>
  );
};

export default ModalRoutes;
