import React, { createContext, useCallback, useContext, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

interface Position {
  latitude: number;
  longitude: number;
}

interface GeolocationContextData {
  currentPosition: Position;
  updateCurrentPosition(): Promise<void>;
  getDistanceToCurrentPosition(position: Position): number;
}

const GeolocationContext = createContext({} as GeolocationContextData);

const GeolocationProvider: React.FC = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState<Position>(
    {} as Position,
  );

  const getDistanceToCurrentPosition = useCallback(
    (position: Position) => {
      const R = 6371e3; // metres
      const φ1 = (position.latitude * Math.PI) / 180; // φ, λ in radians
      const φ2 = (currentPosition.latitude * Math.PI) / 180;
      const Δφ =
        ((currentPosition.latitude - position.latitude) * Math.PI) / 180;
      const Δλ =
        ((currentPosition.longitude - position.longitude) * Math.PI) / 180;
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // in metres
      return d;
    },
    [currentPosition],
  );

  const updateCurrentPosition = useCallback(() => {
    const promise = new Promise<void>((resolve, reject) => {
      Geolocation.requestAuthorization('whenInUse').then(result => {
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setCurrentPosition({ latitude, longitude });
              resolve();
            },
            error => {
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 10000,
            },
          );
        } else {
          const error = new Error('authorization not granted');
          reject(error);
        }
      });
    });
    return promise;
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        currentPosition,
        updateCurrentPosition,
        getDistanceToCurrentPosition,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

function useGeolocation(): GeolocationContextData {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw new Error(
      'useGeolocation must be used within an GeolocationProvider',
    );
  }

  return context;
}

export { GeolocationProvider, useGeolocation };
