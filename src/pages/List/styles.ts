import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ad } from '.';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  HIGHLIGHT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
  SMOOTH_HIGHLIGHT_COLOR,
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

export const FindContainer = styled.View`
  flex: 1;
  height: 60px;
  padding: 0 16px;
  background: ${BACKGROUND_COLOR};
  border-radius: 10px;
  margin: 0 24px 8px 0;
  flex-direction: row;
  align-items: center;
`;

export const FindField = styled.TextInput`
  flex: 1;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  background: ${BACKGROUND_COLOR};
  padding-left: 8px;
`;

export const FilterButton = styled.TouchableOpacity``;

export const AdList = styled(FlatList as new () => FlatList<Ad>)`
  padding: 12px;
`;

export const AdContainer = styled(RectButton)`
  padding: 10px;
  margin-bottom: 6px;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-radius: 2px;
  border-color: ${LIGHT_HIGHLIGHT_COLOR};
`;

export const AdImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 2px;
`;

export const AdInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const AdTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
`;

export const AdMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const AdMetaText = styled.Text`
  margin-left: 8px;
  color: ${NORMAL_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
`;
