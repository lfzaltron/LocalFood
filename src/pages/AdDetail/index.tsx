import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { DARK_TEXT_COLOR } from '../../constants';
import Ad from '../../types/Ad';

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  AdImage,
  Price,
  DataContainer,
  Description,
  TagList,
  Tag,
  TagText,
  BuyButton,
  BuyButtonText,
} from './styles';

interface AdDetailProps {
  navigation: {
    setOptions(options: StackNavigationOptions): void;
  };
}

const AdDetail: React.FC<AdDetailProps> = ({ navigation }) => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const ad = route.params as Ad;

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => (
          <HeaderContainer>
            <HeaderTitle>{ad.title}</HeaderTitle>
          </HeaderContainer>
        ),
        headerBackTitleVisible: false,
      }),
    [navigation, ad],
  );

  return (
    <Container>
      <ScrollView>
        <AdImage source={{ uri: ad.imageUrl }} />
        <DataContainer>
          <Price>
            R$
            {` ${ad.price.toFixed(2)}`}
          </Price>
          <Description>{ad.description}</Description>
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
        </DataContainer>
      </ScrollView>
      <BuyButton onPress={() => console.log('Comprouuu!!')}>
        <BuyButtonText>Comprar</BuyButtonText>
      </BuyButton>
    </Container>
  );
};

export default AdDetail;
