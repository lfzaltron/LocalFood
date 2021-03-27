import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import Message from '../../types/Message';
import { DARK_TEXT_COLOR, LIGHT_HIGHLIGHT_COLOR } from '../../constants';

interface MessageContainerProps {
  sent: boolean;
}

export const MessageList = styled(FlatList as new () => FlatList<Message>)`
  padding: 12px;
`;

export const MessageContainer = styled.View<MessageContainerProps>`
  ${props =>
    props.sent
      ? css`
          align-items: flex-end;
        `
      : css`
          align-items: flex-start;
        `}
`;

export const MessageTextContainer = styled.View<MessageContainerProps>`
  flex: 0;
  margin-bottom: 12px;
  align-items: center;
  border-radius: 12px;
  padding: 20px;

  ${props =>
    props.sent
      ? css`
          background-color: #e9a074;
          align-items: flex-end;
        `
      : css`
          background-color: ${LIGHT_HIGHLIGHT_COLOR};
          align-items: flex-start;
        `}
`;

export const MessageText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${DARK_TEXT_COLOR};
`;
