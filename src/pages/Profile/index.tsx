import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Text>Profile</Text>
      <RectButton onPress={signOut}>
        <Text>Sair</Text>
      </RectButton>
    </Container>
  );
};

export default Profile;
