import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';

import Button from '../../components/Button';
import { useGeolocation } from '../../hooks/geolocation';

import { Container } from './styles';

const Filters: React.FC = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    distancia: 0,
  });
  const {
    currentPosition,
    getDistanceToCurrentPosition,
    updateCurrentPosition,
  } = useGeolocation();

  const handleCurrentLocationPressed = useCallback(async () => {
    updateCurrentPosition();
  }, [updateCurrentPosition]);

  useEffect(() => {
    const distancia = getDistanceToCurrentPosition({
      latitude: -30.0429672,
      longitude: -51.217359,
    });
    setLocation({ ...currentPosition, distancia: distancia || 0 });
  }, [currentPosition, getDistanceToCurrentPosition]);

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
