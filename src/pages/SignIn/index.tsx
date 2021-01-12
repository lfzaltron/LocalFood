import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Title>Hello World!</Title>
    <Input name="email" icon="mail" placeholder="E-mail" />
    <Input name="password" icon="lock" placeholder="Senha" />
    <Button onPress={() => console.log('pressss')}>Entrar</Button>
  </Container>
);

export default SignIn;
