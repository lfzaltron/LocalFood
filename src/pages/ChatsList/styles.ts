import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { DARK_TEXT_COLOR, NORMAL_TEXT_COLOR } from '../../constants';
import { Chat } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const ChatsListView = styled(FlatList as new () => FlatList<Chat>)`
  padding: 12px;
`;

export const ChatContainer = styled.View`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #bbb;
`;

export const ChatButton = styled(RectButton)``;

export const ChatDestinationUser = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin: 10px 10px 5px 12px;
  color: ${DARK_TEXT_COLOR};
`;

export const ChatLastMessage = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  margin: 10px 10px 5px 24px;
  color: ${NORMAL_TEXT_COLOR};
`;
export const NoChatsContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const NoChatsText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: ${NORMAL_TEXT_COLOR};
  text-align: center;
  margin: 30px;
`;
