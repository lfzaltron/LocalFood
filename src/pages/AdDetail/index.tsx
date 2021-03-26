import React, { useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import { ScrollView } from 'react-native-gesture-handler';
import { DARK_TEXT_COLOR } from '../../constants';
import Ad from '../../types/Ad';
import Header from '../../components/Header';

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
} from './styles';

interface AdDetailProps {
  navigation: {
    setOptions(options: StackNavigationOptions): void;
  };
}

const AdDetail: React.FC<AdDetailProps> = ({ navigation }) => {
  const { navigate } = useNavigation();
  const route = useRoute();
  const ad = route.params as Ad;

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => <Header>{ad.title}</Header>,
        headerBackTitleVisible: false,
      }),
    [navigation, ad],
  );

  const handleSellerButtonPress = useCallback(() => {
    navigate('Seller', { userId: ad.user.id });
  }, [ad.user.id, navigate]);

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
      <BuyButton onPress={() => console.log('Comprouuu!!')}>
        <BuyButtonText>Comprar</BuyButtonText>
      </BuyButton>
    </Container>
  );
};

export default AdDetail;
