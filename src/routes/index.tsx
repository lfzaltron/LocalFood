import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../hooks/auth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import List from '../pages/List';
import AdDetail from '../pages/AdDetail';
import Filters from '../pages/Filters';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../constants';

const Main = createStackNavigator();
const Root = createStackNavigator();

const MainRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={HIGHLIGHT_COLOR} />
      </View>
    );
  }
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: DARK_TEXT_COLOR,
        headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      {!user && (
        <>
          <Main.Screen name="SignIn" component={SignIn} />
          <Main.Screen name="SignUp" component={SignUp} />
        </>
      )}

      {!!user && (
        <>
          <Main.Screen name="List" component={List} />
          <Main.Screen
            name="AdDetail"
            component={AdDetail}
            options={{ headerShown: true, title: '' }}
          />
        </>
      )}
    </Main.Navigator>
  );
};

const RootRoutes: React.FC = () => {
  return (
    <Root.Navigator
      mode="modal"
      screenOptions={{
        headerShown: true,
        headerTintColor: DARK_TEXT_COLOR,
        headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
        headerBackTitleVisible: false,
      }}
    >
      <Root.Screen
        name="Main"
        component={MainRoutes}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Filters"
        component={Filters}
        options={{ title: 'Filtros' }}
      />
    </Root.Navigator>
  );
};

export default RootRoutes;
