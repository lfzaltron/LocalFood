import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
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
