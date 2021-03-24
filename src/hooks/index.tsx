import React from 'react';

import { AuthProvider } from './auth';
import { GeolocationProvider } from './geolocation';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GeolocationProvider>{children}</GeolocationProvider>
  </AuthProvider>
);

export default AppProvider;
