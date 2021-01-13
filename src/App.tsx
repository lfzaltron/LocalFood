import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import { BACKGROUND_COLOR } from './constants';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
    <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
