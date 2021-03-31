import React, { useCallback, useRef, useState, useEffect } from 'react';
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
  TagList,
  TagContainer,
  TagText,
  ListContainer,
} from './styles';
import { HIGHLIGHT_COLOR, NORMAL_TEXT_COLOR } from '../../constants';
import Tag from '../../types/Tag';

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

export interface TagItem {
  tag: Tag;
  checked: boolean;
}

const NewAd: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  const [image, setImage] = useState<ImageData>({ uri: '', fileName: '' });
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<TagItem[]>([]);

  const uploadImage = useCallback(async () => {
    const reference = storage().ref(image.fileName);
    await reference.putFile(image.uri);
    return reference.getDownloadURL();
  }, [image]);

  const fieldsFilled = useCallback(
    (data: AdFormContent) => {
      return (
        image.uri.length > 0 &&
        data.title.length > 0 &&
        data.description.length > 0 &&
        data.price > 0
      );
    },
    [image.uri.length],
  );

  const fetchTags = useCallback(async () => {
    const tagsCollection = await firestore().collection('Tags').get();

    setTags(
      tagsCollection.docs.map(item => ({
        checked: false,
        tag: { title: item.id },
      })),
    );
  }, []);

  const cleanContent = useCallback(() => {
    setImage({ uri: '', fileName: '' });
    fetchTags();
    formRef.current?.reset();
  }, [fetchTags]);

  const handleSave = useCallback(
    async (data: AdFormContent) => {
      if (!fieldsFilled(data)) {
        Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
        return;
      }
      setLoading(true);
      const imageUrl = await uploadImage();
      const selectedTags = tags
        .filter(item => item.checked)
        .map(item => item.tag.title);

      firestore()
        .collection('Ads')
        .add({
          ...data,
          imageUrl,
          tags: selectedTags,
          userId: user.id,
          latitude: user.latitude,
          longitude: user.longitude,
        })
        .then(() => {
          setLoading(false);
          cleanContent();
          navigate('List');
        });
    },
    [
      cleanContent,
      fieldsFilled,
      navigate,
      tags,
      uploadImage,
      user.id,
      user.latitude,
      user.longitude,
    ],
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

  const selectTag = useCallback(
    (tag: TagItem) => {
      setTags(
        tags.map(item => {
          // eslint-disable-next-line no-param-reassign
          if (item.tag === tag.tag) item.checked = !item.checked;
          return item;
        }),
      );
    },
    [tags],
  );

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

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      enabled
    >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
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
              returnKeyType="default"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <ListContainer>
              <TagList
                data={tags}
                keyExtractor={item => item.tag.title}
                renderItem={({ item }) => (
                  <TagContainer onPress={() => selectTag(item)}>
                    <TagText checked={item.checked}>{item.tag.title}</TagText>
                    <Icon
                      name={item.checked ? 'check-circle' : 'circle'}
                      size={20}
                      color={item.checked ? HIGHLIGHT_COLOR : NORMAL_TEXT_COLOR}
                    />
                  </TagContainer>
                )}
              />
            </ListContainer>
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
