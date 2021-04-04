import React from 'react';

import { AuthProvider } from './auth';
import { FilterProvider } from './filter';
import { GeolocationProvider } from './geolocation';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GeolocationProvider>
      <FilterProvider>{children}</FilterProvider>
    </GeolocationProvider>
  </AuthProvider>
);

export default AppProvider;
