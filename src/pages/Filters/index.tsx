import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Button from '../../components/Button';

import { Container } from './styles';

const Filters: React.FC = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const handleCurrentLocationPressed = useCallback(async () => {
    const result = await Geolocation.requestAuthorization('whenInUse');
    console.log({ result });

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
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
    </Container>
  );
};

export default Filters;
