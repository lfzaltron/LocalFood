import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { DARK_TEXT_COLOR } from '../../constants';
import { Ad } from '../List';

import {
  Container,
  TopBar,
  BackButton,
  Title,
  AdImage,
  Price,
  DataContainer,
  Description,
  TagList,
  Tag,
  TagText,
} from './styles';

const AdDetail: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const ad = route.params as Ad;

  return (
    <Container>
      <ScrollView>
        <TopBar>
          <BackButton onPress={goBack}>
            <Icon name="arrow-left" size={20} color={DARK_TEXT_COLOR} />
          </BackButton>
          <Title>{ad.title}</Title>
        </TopBar>
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
    </Container>
  );
};

export default AdDetail;
