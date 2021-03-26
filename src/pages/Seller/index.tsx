import React, { useEffect, useState } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import Header from '../../components/Header';

import { Container, Text } from './styles';

interface SellerProps {
  navigation: {
    setOptions(options: StackNavigationOptions): void;
  };
}

interface SellerData {
  userId: string;
}

const Seller: React.FC<SellerProps> = ({ navigation }) => {
  const [seller, setSeller] = useState();
  const route = useRoute();
  const { userId } = route.params as SellerData;

  useEffect(() => {
    // TODO: Buscar os dados do vendedor do firebase para mostrar
    // TODO: Buscar os anuncios do vendedor do firebase
  }, [userId]);

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => <Header>Nome do anunciante</Header>,
        headerBackTitleVisible: false,
      }),
    [navigation],
  );

  return (
    <Container>
      <Text>Seller screen</Text>
    </Container>
  );
};

export default Seller;
