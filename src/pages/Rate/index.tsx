import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Rating, AirbnbRating } from 'react-native-elements';

import ListAds from '../../components/ListAds';
import { DARK_TEXT_COLOR, HIGHLIGHT_COLOR } from '../../constants';

import {
  Container,
  NameText,
  Form,
  RatingView,
  Title,
  UserData,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface RateProps {
  id: string;
  name: string;
}

interface ObsFormContent {
  obs: string;
}

const Rate: React.FC = () => {
  const [rate, setRate] = useState(5);
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const route = useRoute();
  const { goBack } = useNavigation();
  const { id, name } = route.params as RateProps;

  const handleSave = useCallback(
    (data: ObsFormContent) => {
      firestore()
        .collection('Users')
        .doc(id)
        .collection('Rates')
        .doc(user.id)
        .set({ stars: rate, obs: data.obs });
      goBack();
    },
    [goBack, id, rate, user.id],
  );

  return (
    <Container>
      <UserData>
        <Title>Avaliação de:</Title>
        <NameText>{name}</NameText>
      </UserData>

      <Form ref={formRef} onSubmit={handleSave}>
        <RatingView>
          <AirbnbRating
            showRating={false}
            defaultRating={rate}
            onFinishRating={setRate}
          />
        </RatingView>
        <Input
          name="obs"
          icon=""
          placeholder="Observações"
          autoCorrect
          autoCapitalize="sentences"
          returnKeyType="default"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
        <Button onPress={() => formRef.current?.submitForm()}>Salvar</Button>
      </Form>
    </Container>
  );
};

export default Rate;
