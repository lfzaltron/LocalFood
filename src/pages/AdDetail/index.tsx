import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import { Container, TopBar, BackButton, Title } from './styles';
import { DARK_TEXT_COLOR } from '../../constants';
import { Ad } from '../List';

const AdDetail: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const ad = route.params as Ad;

  return (
    <Container>
      <TopBar>
        <BackButton onPress={goBack}>
          <Icon name="arrow-left" size={20} color={DARK_TEXT_COLOR} />
        </BackButton>
        <Title>{ad.title}</Title>
      </TopBar>
    </Container>
  );
};

export default AdDetail;
