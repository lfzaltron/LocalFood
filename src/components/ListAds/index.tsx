import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { RefreshControl } from 'react-native';

import Ad from '../../types/Ad';
import { DARK_TEXT_COLOR } from '../../constants';

import {
  AdList,
  AdContainer,
  AdImage,
  AdInfo,
  AdTitle,
  AdMeta,
  AdMetaText,
} from './styles';

interface ListAdsProps {
  ads: Ad[];
  refreshing: boolean;
  onRefresh(): void;
}

const ListAds: React.FC<ListAdsProps> = ({ ads, refreshing, onRefresh }) => {
  const { navigate } = useNavigation();

  const navigateToDetail = useCallback(
    ad => {
      navigate('AdDetail', ad);
    },
    [navigate],
  );

  return (
    <AdList
      data={ads}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyExtractor={ad => ad.id}
      renderItem={({ item: ad }) => (
        <AdContainer onPress={() => navigateToDetail(ad)}>
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
  );
};

export default ListAds;
