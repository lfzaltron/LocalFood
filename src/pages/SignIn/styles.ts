import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import {
  BACKGROUND_COLOR,
  HIGHLIGHT_COLOR,
  NORMAL_TEXT_COLOR,
  SMOTH_HIGHLIGHT_COLOR,
} from '../../constants';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${NORMAL_TEXT_COLOR};
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: ${NORMAL_TEXT_COLOR};
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  background: ${BACKGROUND_COLOR};
  border-color: ${SMOTH_HIGHLIGHT_COLOR};
  border-top-width: 1px;
`;

export const CreateAccountButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: ${HIGHLIGHT_COLOR};
  font-size: 16px;
  margin-left: 16px;
`;
