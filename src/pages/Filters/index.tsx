import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Button from '../../components/Button';

import { Container } from './styles';

const Filters: React.FC = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    distancia: 0,
  });
  const handleCurrentLocationPressed = useCallback(async () => {
    const result = await Geolocation.requestAuthorization('whenInUse');
    console.log({ result });

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const { latitude, longitude } = position.coords;

        const d = distance(
          { latitude, longitude },
          { latitude: -30.0429672, longitude: -51.217359 },
        );

        setLocation({ latitude, longitude, distancia: d });
      },
      error => {
        console.log(error.code, error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );
  }, []);

  return (
    <Container>
      <Text>Selecionar os filtros...</Text>

      <Button onPress={handleCurrentLocationPressed}>Localizar!</Button>
      <Text>
        Latitude:
        {location.latitude}
      </Text>
      <Text>
        Longitude:
        {location.longitude}
      </Text>
      <Text>
        Distancia:
        {location.distancia}
      </Text>
    </Container>
  );
};

export default Filters;

function distance(
  p1: { latitude: number; longitude: number },
  p2: { latitude: number; longitude: number },
) {
  const R = 6371e3; // metres
  const φ1 = (p1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (p2.latitude * Math.PI) / 180;
  const Δφ = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  const Δλ = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // in metres
  return d;
}
