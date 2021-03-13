import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { FormHandles } from '@unform/core';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  ImageButton,
  Image,
  AddImageText,
  AddImageContainer,
  Form,
  Loading,
} from './styles';
import { HIGHLIGHT_COLOR, NORMAL_TEXT_COLOR } from '../../constants';

interface AdFormContent {
  title: string;
  description: string;
  tags: string[];
  price: number;
  imageUrl: string;
}

interface ImageData {
  uri: string;
  fileName: string;
}

const NewAd: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  const [image, setImage] = useState<ImageData>({ uri: '', fileName: '' });
  const [loading, setLoading] = useState(false);

  const uploadImage = useCallback(async () => {
    const reference = storage().ref(image.fileName);
    await reference.putFile(image.uri);
    return reference.getDownloadURL();
  }, [image]);

  const handleSave = useCallback(
    async (data: AdFormContent) => {
      setLoading(true);
      const imageUrl = await uploadImage();

      firestore()
        .collection('Ads')
        .add({ ...data, imageUrl })
        .then(() => {
          setLoading(false);
          navigate('List');
        });
    },
    [navigate, uploadImage],
  );

  const uploadSelectedImage = useCallback((response: ImagePickerResponse) => {
    if (
      response.didCancel ||
      response.uri === undefined ||
      response.fileName === undefined
    )
      return;
    if (response.errorCode) {
      Alert.alert('Erro ao atualizar avatar.');
      return;
    }

    setImage({ uri: response.uri!, fileName: response.fileName! });
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
          {loading && (
            <Loading size="large" color={HIGHLIGHT_COLOR} animating={loading} />
          )}
          <ImageButton onPress={handleUpdateAvatar}>
            {image.uri === '' ? (
              <AddImageContainer>
                <Icon name="camera" size={50} color={NORMAL_TEXT_COLOR} />
                <AddImageText>Selecione uma imagem</AddImageText>
              </AddImageContainer>
            ) : (
              <Image source={image} />
            )}
          </ImageButton>

          <Form ref={formRef} onSubmit={handleSave}>
            <Input
              name="title"
              icon=""
              placeholder="Título"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => descriptionInputRef.current?.focus()}
            />
            <Input
              name="description"
              icon=""
              placeholder="Descrição"
              autoCorrect
              autoCapitalize="sentences"
              ref={descriptionInputRef}
              returnKeyType="next"
              onSubmitEditing={() => priceInputRef.current?.focus()}
            />
            <Input
              name="price"
              icon=""
              placeholder="Preço (R$)"
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
