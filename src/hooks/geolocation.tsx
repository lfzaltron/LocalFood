import React, { createContext, useCallback, useContext, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

interface Position {
  latitude: number;
  longitude: number;
}

interface GeolocationContextData {
  currentPosition: Position;
  updateCurrentPosition(): Promise<void>;
  getDistance(position1: Position, position2: Position): number;
}

const GeolocationContext = createContext({} as GeolocationContextData);

const GeolocationProvider: React.FC = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState<Position>(
    {} as Position,
  );

  const getDistance = useCallback(
    (position1: Position, position2: Position) => {
      const R = 6371e3; // metres
      const φ1 = (position2.latitude * Math.PI) / 180; // φ, λ in radians
      const φ2 = (position1.latitude * Math.PI) / 180;
      const Δφ = ((position1.latitude - position2.latitude) * Math.PI) / 180;
      const Δλ = ((position1.longitude - position2.longitude) * Math.PI) / 180;
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // in metres
      return d / 1000; // in km
    },
    [],
  );

  const updateCurrentPosition = useCallback(() => {
    const promise = new Promise<void>((resolve, reject) => {
      Geolocation.requestAuthorization('whenInUse').then(result => {
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              console.log({ latitude, longitude });
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
        getDistance,
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
