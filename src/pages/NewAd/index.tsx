import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ImageButton, Image } from './styles';

interface AdFormContent {
  title: string;
  description: string;
  tags: string[];
  price: number;
  imageUrl: string;
}

const NewAd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  // TODO: temp
  const [imageUrl, setImageUrl] = useState(
    'https://image.shutterstock.com/image-vector/food-icon-design-template-260nw-1042503748.jpg',
  );

  const handleSave = useCallback((data: AdFormContent) => {
    console.log('Salvar!');
  }, []);

  const uploadSelectedImage = useCallback((response: ImagePickerResponse) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Erro ao atualizar avatar.');
      return;
    }
    setImageUrl(response.uri || '');
  }, []);

  const handleUpdateAvatar = useCallback(() => {
    Alert.alert(
      'Upload de imagem',
      'Deseja utilizar a câmera ou selecionar uma imagem da galeria?',
      [
        {
          text: 'Câmera',
          onPress: () =>
            launchCamera({ mediaType: 'photo' }, uploadSelectedImage),
        },
        {
          text: 'Galeria',
          onPress: () =>
            launchImageLibrary({ mediaType: 'photo' }, uploadSelectedImage),
        },
        { text: 'Cancelar' },
      ],
    );
  }, [uploadSelectedImage]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <ImageButton onPress={handleUpdateAvatar}>
            <Image source={{ uri: imageUrl }} />
          </ImageButton>

          <Form ref={formRef} onSubmit={handleSave}>
            <Input
              name="title"
              icon=""
              placeholder="Ex: Pizza congelada"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => descriptionInputRef.current?.focus()}
            />
            <Input
              name="description"
              icon=""
              placeholder="Ex: Pizza congelada com 45cm de diâmetro, feita com massa caseira. Recheios: calabresa, 4 queijos, bacon."
              autoCorrect
              autoCapitalize="sentences"
              ref={descriptionInputRef}
              returnKeyType="next"
              onSubmitEditing={() => priceInputRef.current?.focus()}
            />
            <Input
              name="price"
              icon=""
              placeholder="Ex: 14,90"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="decimal-pad"
              ref={priceInputRef}
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Salvar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewAd;
