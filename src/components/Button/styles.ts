import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { BACKGROUND_COLOR, HIGHLIGHT_COLOR } from '../../constants';

export const Container = styled(RectButton)`
  height: 60px;
  background: ${HIGHLIGHT_COLOR};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${BACKGROUND_COLOR};
  font-size: 18px;
`;
