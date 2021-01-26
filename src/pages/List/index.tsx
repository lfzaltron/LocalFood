import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  TopBar,
  FindContainer,
  FindField,
  FilterButton,
  SignOutButton,
  SignOutButtonText,
  AdList,
  AdContainer,
  AdImage,
  AdInfo,
  AdTitle,
  AdMeta,
  AdMetaText,
} from './styles';
import { DARK_TEXT_COLOR } from '../../constants';

export interface Ad {
  id: string;
  title: string;
  tags: string[];
  price: number;
  imageUrl: string;
}

const List: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const { signOut } = useAuth();
  const [search, setSearch] = useState('');
  const { navigate } = useNavigation();

  // Stub...Substituir por dados do backend
  useEffect(() => {
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
        <FilterButton onPress={() => console.log('Filters')}>
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
      <SignOutButton onPress={signOut}>
        <SignOutButtonText>Stub SignOut</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
};

export default List;
