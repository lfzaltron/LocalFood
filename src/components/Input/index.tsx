import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';
import { NORMAL_TEXT_COLOR } from '../../constants';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color={NORMAL_TEXT_COLOR} />
    <TextInput placeholderTextColor={NORMAL_TEXT_COLOR} {...rest} />
  </Container>
);

export default Input;
