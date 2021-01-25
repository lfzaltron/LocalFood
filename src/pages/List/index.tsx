import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Title, SignOutButton, SignOutButtonText } from './styles';

const List: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Title>Lista!!!</Title>
      <SignOutButton onPress={signOut}>
        <SignOutButtonText>Stub SignOut</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
};

export default List;
