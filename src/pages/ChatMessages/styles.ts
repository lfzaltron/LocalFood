import styled from 'styled-components/native';
import {
  BACKGROUND_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_HIGHLIGHT_COLOR,
} from '../../constants';

export const InputContainer = styled.View`
  background-color: #f00;

  width: 100%;
  min-height: 60px;
  padding: 4px 16px;
  background: ${LIGHT_HIGHLIGHT_COLOR};
  border-radius: 10px;
  margin: 8px 0;
  flex-direction: row;
  align-items: center;
`;

export const MessageTextInput = styled.TextInput`
  flex: 1;
  color: ${DARK_TEXT_COLOR};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  min-height: 40px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  margin-right: 16px;
`;

export const SendButton = styled.TouchableOpacity`
  padding: 0 20px;
`;
