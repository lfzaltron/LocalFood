import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '../../hooks/auth';
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
  const { signOut } = useAuth();
  const [search, setSearch] = useState('');
  const { navigate } = useNavigation();

  // Stub...Substituir por dados do backend
  useEffect(() => {
    (async () => {
      const adsCollection = await firestore()
        .collection('Ads')
        .where('title', 'in', ['Pizza congelada'])
        .get();
      adsCollection.docs.forEach(doc => {
        console.log(doc.data());
      });
      // console.log(adsCollection.docs);
      // console.log({ adsCollection });
    })();

    const stubAds = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 8; i++) {
      stubAds.push({
        id: `${i}`,
        title: `Anuncio ${i}`,
        tags: ['LowCarb', 'Fit', 'GlutenFree'],
        price: 15.9 + i,
        imageUrl:
          'https://image.shutterstock.com/image-vector/food-icon-design-template-260nw-1042503748.jpg',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting \
industry. Lorem Ipsum has been the industrys standard dummy text \
ever since the 1500s, when an unknown printer took a galley of type \
and scrambled it to make a type specimen book. It has survived not \
only five centuries, but also the leap into electronic typesetting, \
remaining essentially unchanged. It was popularised in the 1960s \
with the release of Letraset sheets containing Lorem Ipsum passages, \
and more recently with',
      });
    }
    setAds(stubAds);
  }, []);

  useEffect(() => {
    console.log(search);
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
