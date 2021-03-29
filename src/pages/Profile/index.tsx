import React, { useRef, useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { HIGHLIGHT_COLOR } from '../../constants';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  NameButton,
  NameText,
  Header,
  Avatar,
  ContentContainer,
  UpdateLocationButton,
  UpdateLocationText,
  SignOutButton,
  SignOutText,
} from './styles';
import { useGeolocation } from '../../hooks/geolocation';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const [saving, setSaving] = useState(false);
  const { signOut, user, updateUserData } = useAuth();
  const { currentPosition, updateCurrentPosition } = useGeolocation();

  const handleSave = useCallback(
    (data: UserFormData) => {
      setSaving(true);

      updateUserData({ ...user, ...data, ...currentPosition })
        .then(() => Alert.alert('Feito', 'Alterações salvas com sucesso!'))
        .catch(() =>
          Alert.alert('Erro ao salvar dados', 'Por favor, tente novamente.'),
        )
        .finally(() => setSaving(false));
    },
    [currentPosition, updateUserData, user],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      enabled
    >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <Container>
          <Header>
            <NameButton onPress={() => nameInputRef.current?.focus()}>
              <NameText>{user.name || 'Nome'}</NameText>
            </NameButton>
          </Header>

          <Avatar>
            <Icon name="user" size={50} color={HIGHLIGHT_COLOR} />
          </Avatar>

          <ContentContainer>
            <Form ref={formRef} onSubmit={handleSave} initialData={user}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="done"
                ref={nameInputRef}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                editable={false}
              />
              <Input
                name="phoneNumber"
                icon="phone"
                placeholder="Telefone com DDD"
                autoCorrect
                keyboardType="phone-pad"
                returnKeyType="done"
              />
              <Input
                name="address"
                icon="map"
                placeholder="Endereço"
                autoCorrect
                autoCapitalize="sentences"
                returnKeyType="done"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <UpdateLocationButton onPress={updateCurrentPosition}>
                <Icon name="map-pin" size={20} color={HIGHLIGHT_COLOR} />
                <UpdateLocationText>
                  Atualizar localização GPS
                </UpdateLocationText>
              </UpdateLocationButton>

              <Button
                onPress={() => formRef.current?.submitForm()}
                enabled={!saving}
              >
                {saving ? 'Aguarde...' : 'Salvar alterações'}
              </Button>
              <SignOutButton onPress={signOut}>
                <SignOutText>Sair</SignOutText>
              </SignOutButton>
            </Form>
          </ContentContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
