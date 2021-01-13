import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { NORMAL_TEXT_COLOR } from '../../constants';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <Icon name={icon} size={20} color={NORMAL_TEXT_COLOR} />
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        placeholderTextColor={NORMAL_TEXT_COLOR}
        {...rest}
      />
    </Container>
  );
};

export default Input;
