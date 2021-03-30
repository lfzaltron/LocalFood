import React, { useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

import { getChatId, sendMessage } from '../../services/chat';
import { DARK_TEXT_COLOR } from '../../constants';
import Ad from '../../types/Ad';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  AdImage,
  Price,
  DataContainer,
  Description,
  TagList,
  Tag,
  TagText,
  BuyButton,
  BuyButtonText,
  SellerContainer,
  SectionTitle,
  SellerName,
  DeleteButton,
} from './styles';

interface AdDetailProps {
  navigation: {
    setOptions(options: StackNavigationOptions): void;
  };
}

const AdDetail: React.FC<AdDetailProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const ad = route.params as Ad;

  const handleDelete = useCallback(() => {
    if (user.id === ad.user.id) {
      Alert.alert('Excluir', 'Deseja excluir esse anúncio?', [
        {
          text: 'Sim',
          onPress: () => {
            firestore().collection('Ads').doc(ad.id).delete();
            goBack();
          },
        },
        {
          text: 'Não',
        },
      ]);
    }
  }, [ad.id, ad.user.id, goBack, user.id]);

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => <Header>{ad.title}</Header>,
        headerBackTitleVisible: false,
        headerRight: () => {
          if (user.id === ad.user.id)
            return (
              <DeleteButton onPress={handleDelete}>
                <Icon name="trash-2" size={24} color={DARK_TEXT_COLOR} />
              </DeleteButton>
            );
          return <></>;
        },
      }),
    [navigation, ad, user.id, handleDelete],
  );

  const handleSellerButtonPress = useCallback(() => {
    navigate('Seller', { userId: ad.user.id });
  }, [ad.user.id, navigate]);

  const handleContactSeller = useCallback(async () => {
    if (!user) {
      navigate('Profile');
    }

    const chatId = await getChatId({ fromId: user.id, toId: ad.user.id });

    sendMessage({
      chatId,
      fromId: user.id,
      toId: ad.user.id,
      text: `Olá, estou interessado no seu anúncio de ${ad.title}`,
    });

    navigate('Chats', {
      screen: 'ChatsList',
      params: {
        chatId,
        otherUserId: ad.user.id,
        otherUserName: ad.user.name,
      },
    });
  }, [navigate, ad, user]);

  return (
    <Container>
      <ScrollView>
        <AdImage source={{ uri: ad.imageUrl }} />
        <DataContainer>
          <Price>
            R$
            {` ${ad.price.toFixed(2)}`}
          </Price>
          <SectionTitle>Descrição:</SectionTitle>
          <Description>{ad.description}</Description>

          <SectionTitle>Tags:</SectionTitle>
          <TagList
            data={ad.tags}
            numColumns={2}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item: tag }) => (
              <Tag>
                <Icon name="tag" size={14} color={DARK_TEXT_COLOR} />
                <TagText>{tag}</TagText>
              </Tag>
            )}
          />

          <SectionTitle>Vendedor:</SectionTitle>
          <SellerContainer onPress={handleSellerButtonPress}>
            <Icon name="user" size={20} color={DARK_TEXT_COLOR} />
            <SellerName>{ad.user.name}</SellerName>
          </SellerContainer>
        </DataContainer>
      </ScrollView>
      <BuyButton onPress={handleContactSeller}>
        <BuyButtonText>Entrar em contato</BuyButtonText>
      </BuyButton>
    </Container>
  );
};

export default AdDetail;
