import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Ad from '../../types/Ad';
import ListAds from '../../components/ListAds';
import { useFilter } from '../../hooks/filter';
import { useGeolocation } from '../../hooks/geolocation';

import { DARK_TEXT_COLOR } from '../../constants';

import {
  Container,
  TopBar,
  FindContainer,
  FindField,
  FilterButton,
} from './styles';

const List: React.FC = () => {
  const { filterFn, orderFn, position } = useFilter();
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [search, setSearch] = useState('');
  const { navigate } = useNavigation();
  const { getDistance } = useGeolocation();

  const loadAds = useCallback(async () => {
    setLoading(true);

    const adsCollection = await firestore()
      .collection('Ads')
      // .where('title', 'in', ['Pizza congelada'])
      .get();

    const stubAds: Ad[] = [];
    const searchUpper = search.toUpperCase();
    for (let i = 0; i < adsCollection.docs.length; i += 1) {
      const doc = adsCollection.docs[i];
      const title = doc.data().title.toUpperCase();

      let distance;
      const { latitude, longitude } = doc.data();
      if (position && latitude && longitude) {
        distance = getDistance({ latitude, longitude }, position);
        console.log({ distance });
      }

      const currentAd = {
        id: doc.id,
        title: doc.data().title,
        tags: doc.data().tags,
        price: parseFloat(doc.data().price),
        imageUrl: doc.data().imageUrl,
        description: doc.data().description,
        user: {
          id: doc.data().userId,
          name: '',
        },
        date: doc.data().date.toDate(),
        latitude,
        longitude,
        distance,
      };

      if (title.includes(searchUpper)) {
        firestore()
          .collection('Users')
          .doc(currentAd.user.id)
          .get()
          .then(userData => {
            currentAd.user.name = userData.data()?.name;
          });
        stubAds.push(currentAd);
      }
    }

    setAds(stubAds.filter(filterFn).sort(orderFn));
    setLoading(false);
  }, [search, filterFn, orderFn, position, getDistance]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  return (
    <Container>
      <TopBar>
        <FindContainer>
          <Icon name="search" size={20} color={DARK_TEXT_COLOR} />
          <FindField
            placeholder="Busca"
            onEndEditing={e => setSearch(e.nativeEvent.text)}
          />
        </FindContainer>
        <FilterButton onPress={() => navigate('Filters')}>
          <Icon name="filter" size={28} color={DARK_TEXT_COLOR} />
        </FilterButton>
      </TopBar>
      <ListAds ads={ads} onRefresh={loadAds} refreshing={loading} />
    </Container>
  );
};

export default List;
