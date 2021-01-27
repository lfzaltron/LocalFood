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

// TODO: Criar um componente para esse Header
export const HeaderContainer = styled.View`
  flex: 1;
  background: ${LIGHT_HIGHLIGHT_COLOR};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 24px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
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
