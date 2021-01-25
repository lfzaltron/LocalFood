import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../hooks/auth';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import List from '../pages/List';
import { BACKGROUND_COLOR, HIGHLIGHT_COLOR } from '../constants';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={HIGHLIGHT_COLOR} />
      </View>
    );
  }
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        // headerTintColor: '#312e38',
        // headerStyle: { backgroundColor: '#f4ede8' },
        cardStyle: { backgroundColor: BACKGROUND_COLOR },
      }}
    >
      {!user && (
        <>
          <Auth.Screen name="SignIn" component={SignIn} />
          <Auth.Screen name="SignUp" component={SignUp} />
        </>
      )}

      {!!user && (
        <>
          <Auth.Screen name="List" component={List} />
        </>
      )}
    </Auth.Navigator>
  );
};

export default AuthRoutes;
