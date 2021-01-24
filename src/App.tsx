import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';
import { BACKGROUND_COLOR } from './constants';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
