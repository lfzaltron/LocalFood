import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
  SMOOTH_HIGHLIGHT_COLOR,
} from '../../constants';

export const Container = styled.View`
  flex: 1;
  padding-bottom: 40px;
`;

export const AdImage = styled.Image`
  height: 250px;
`;

export const DataContainer = styled.View`
  padding: 24px;
`;

export const Price = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 22px;
  color: ${DARK_TEXT_COLOR};
  padding-bottom: 24px;
`;

export const Description = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
  padding-bottom: 24px;
`;

export const TagList = styled(FlatList as new () => FlatList<string>)`
  padding-bottom: 24px;
`;

export const Tag = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 2px;
  flex-basis: 50%;
`;

export const TagText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
  margin-left: 8px;
`;

export const BuyButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0 16px;
  background: ${BACKGROUND_COLOR};
  border-color: ${SMOOTH_HIGHLIGHT_COLOR};
  border-top-width: 1px;
`;

export const BuyButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${HIGHLIGHT_COLOR};
  font-size: 18px;
  margin-left: 16px;
`;

export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${NORMAL_TEXT_COLOR};
  padding-bottom: 12px;
`;

export const SellerContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

export const SellerName = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
  padding-bottom: 12px;
  margin-left: 12px;
`;
