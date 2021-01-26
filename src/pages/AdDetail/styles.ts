import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { DARK_TEXT_COLOR, LIGHT_HIGHLIGHT_COLOR } from '../../constants';

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
