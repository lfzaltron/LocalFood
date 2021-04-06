import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { FormHandles } from '@unform/core';
import { AirbnbRating } from 'react-native-elements';
import { ScrollView } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  NameText,
  Form,
  RatingView,
  Title,
  UserData,
} from './styles';

interface RateProps {
  id: string;
  name: string;
}

interface ObsFormContent {
  obs: string;
}

const Rate: React.FC = () => {
  const [rate, setRate] = useState(5);
  const [obs, setObs] = useState('');
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const route = useRoute();
  const { goBack } = useNavigation();
  const { id, name } = route.params as RateProps;

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(id)
      .collection('Rates')
      .doc(user.id)
      .get()
      .then(snapshot => {
        if (snapshot.data()) {
          setRate(snapshot.data()?.stars);
          setObs(snapshot.data()?.obs);
        }
      });
  }, [id, user.id]);

  const updateUserStarsMed = useCallback(() => {
    firestore()
      .collection('Users')
      .doc(id)
      .collection('Rates')
      .get()
      .then(rates => {
        const total = rates.docs.reduce(
          (sum, curr) => sum + curr.data().stars,
          0,
        );
        const med = total / rates.size;
        firestore().collection('Users').doc(id).update({ stars: med });
      });
  }, [id]);

  const handleSave = useCallback(
    (data: ObsFormContent) => {
      firestore()
        .collection('Users')
        .doc(id)
        .collection('Rates')
        .doc(user.id)
        .set({ stars: rate, obs: data.obs })
        .then(updateUserStarsMed);
      goBack();
    },
    [goBack, id, rate, updateUserStarsMed, user.id],
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <UserData>
          <Title>Avaliação de:</Title>
          <NameText>{name}</NameText>
        </UserData>

        <Form ref={formRef} onSubmit={handleSave} initialData={{ obs }}>
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
    </ScrollView>
  );
};

export default Rate;
