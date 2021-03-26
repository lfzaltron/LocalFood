import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';

import {
  Avatar,
  Container,
  Header,
  NameText,
  PhoneContainer,
  PhoneText,
  SellerDataContainer,
} from './styles';
import Ad from '../../types/Ad';
import ListAds from '../../components/ListAds';
import { DARK_TEXT_COLOR, HIGHLIGHT_COLOR } from '../../constants';

interface SellerProps {
  userId: string;
}

interface SellerData {
  name: string;
  phoneNumber: string;
}

const Seller: React.FC = () => {
  const [seller, setSeller] = useState<SellerData>({} as SellerData);
  const [ads, setAds] = useState<Ad[]>([]);
  const route = useRoute();
  const { userId } = route.params as SellerProps;

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(doc => {
        setSeller(doc.data() as SellerData);
      });
  }, [userId]);

  useEffect(() => {
    (async () => {
      const adsCollection = await firestore()
        .collection('Ads')
        .where('userId', '==', userId)
        .get();

      const stubAds: Ad[] = [];
      for (let i = 0; i < adsCollection.docs.length; i += 1) {
        const doc = adsCollection.docs[i];

        const currentAd = {
          id: doc.id,
          title: doc.data().title,
          tags: doc.data().tags,
          price: parseFloat(doc.data().price),
          imageUrl: doc.data().imageUrl,
          description: doc.data().description,
          user: {
            id: doc.data().userId,
            name: seller.name,
          },
        };

        stubAds.push(currentAd);
      }
      setAds(stubAds);
    })();
  }, [seller, userId]);

  return (
    <Container>
      <SellerDataContainer>
        <Header>
          <NameText>{seller.name}</NameText>
          <PhoneContainer>
            <Icon name="phone" size={20} color={DARK_TEXT_COLOR} />
            <PhoneText>{seller.phoneNumber}</PhoneText>
          </PhoneContainer>
        </Header>
        <Avatar>
          <Icon name="user" size={50} color={HIGHLIGHT_COLOR} />
        </Avatar>
      </SellerDataContainer>
      <ListAds ads={ads} />
    </Container>
  );
};

export default Seller;
