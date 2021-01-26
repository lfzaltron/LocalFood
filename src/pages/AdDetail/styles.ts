import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import {
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
} from '../../constants';

export const Container = styled.View`
  flex: 1;
`;

export const TopBar = styled.View`
  padding: 12px 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: ${LIGHT_HIGHLIGHT_COLOR};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
  flex: 1;
  margin-left: 24px;
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
  color: ${NORMAL_TEXT_COLOR};
  padding-bottom: 24px;
`;

export const TagList = styled(FlatList as new () => FlatList<string>)``;

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
