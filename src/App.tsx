import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';
import { BACKGROUND_COLOR } from './constants';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

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
