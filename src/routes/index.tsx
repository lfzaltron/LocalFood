import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

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
  NORMAL_TEXT_COLOR,
} from '../constants';

const Main = createStackNavigator();
const Root = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainRoutes: React.FC = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: DARK_TEXT_COLOR,
        headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      <Main.Screen name="List" component={List} />
      <Main.Screen
        name="AdDetail"
        component={AdDetail}
        options={{ headerShown: true, title: '' }}
      />
    </Main.Navigator>
  );
};

const ProfileStack = createStackNavigator();
// TODO: Trocar essas rotas por uma tela de profile com SignOut
const ProfileRoutes: React.FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: DARK_TEXT_COLOR,
        headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      <ProfileStack.Screen name="SignUp" component={SignUp} />
    </ProfileStack.Navigator>
  );
};

const SignInStack = createStackNavigator();

const SignInRoutes: React.FC = () => {
  return (
    <SignInStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: DARK_TEXT_COLOR,
        headerStyle: { backgroundColor: LIGHT_HIGHLIGHT_COLOR },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      <SignInStack.Screen name="SignIn" component={SignIn} />
      <SignInStack.Screen name="SignUp" component={SignUp} />
    </SignInStack.Navigator>
  );
};

const TabRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'List') {
            iconName = 'list';
          } else if (route.name === 'Profile') {
            iconName = user ? 'user' : 'log-in';
          } else if (route.name === 'SignUp') {
            iconName = 'plus';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveTintColor: NORMAL_TEXT_COLOR,
        activeTintColor: HIGHLIGHT_COLOR,
        activeBackgroundColor: LIGHT_HIGHLIGHT_COLOR,
        inactiveBackgroundColor: BACKGROUND_COLOR,
        style: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      <Tab.Screen name="List" component={MainRoutes} />
      {!user && <Tab.Screen name="Profile" component={SignInRoutes} />}
      {!!user && <Tab.Screen name="Profile" component={ProfileRoutes} />}
    </Tab.Navigator>
  );
};

const RootRoutes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={HIGHLIGHT_COLOR} />
      </View>
    );
  }

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
        name="Tab"
        component={TabRoutes}
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
