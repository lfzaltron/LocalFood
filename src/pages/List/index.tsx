import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Ad from '../../types/Ad';

import {
  Container,
  TopBar,
  FindContainer,
  FindField,
  FilterButton,
  AdList,
  AdContainer,
  AdImage,
  AdInfo,
  AdTitle,
  AdMeta,
  AdMetaText,
} from './styles';
import { DARK_TEXT_COLOR } from '../../constants';

const List: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [search, setSearch] = useState('');
  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      const adsCollection = await firestore()
        .collection('Ads')
        // .where('title', 'in', ['Pizza congelada'])
        .get();

      const stubAds: Ad[] = [];
      const searchUpper = search.toUpperCase();
      for (let i = 0; i < adsCollection.docs.length; i += 1) {
        const doc = adsCollection.docs[i];
        const title = doc.data().title.toUpperCase();

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
      setAds(stubAds);
    })();
  }, [search]);

  const navigatToDetail = useCallback(
    ad => {
      navigate('AdDetail', ad);
    },
    [navigate],
  );

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
      <AdList
        data={ads}
        keyExtractor={ad => ad.id}
        renderItem={({ item: ad }) => (
          <AdContainer onPress={() => navigatToDetail(ad)}>
            <AdImage source={{ uri: ad.imageUrl }} />
            <AdInfo>
              <AdTitle>{ad.title}</AdTitle>
              <AdMeta>
                <Icon name="tag" size={14} color={DARK_TEXT_COLOR} />
                <AdMetaText>{ad.tags.join(' / ')}</AdMetaText>
              </AdMeta>
              <AdMeta>
                <AdMetaText>
                  R$
                  {` ${ad.price.toFixed(2)}`}
                </AdMetaText>
              </AdMeta>
            </AdInfo>
          </AdContainer>
        )}
      />
    </Container>
  );
};

export default List;
