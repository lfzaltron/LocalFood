import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { NORMAL_TEXT_COLOR } from '../../constants';

import {
  Container,
  ChatsListView,
  ChatContainer,
  ChatDestinationUser,
  ChatLastMessage,
  NoChatsContainer,
  NoChatsText,
  ChatButton,
} from './styles';

export interface Chat {
  from: { id: string; name: string };
  to: { id: string; name: string };
  lastMessage: string;
}

const ChatsList: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    setChats([
      {
        from: { id: '123', name: 'Luis' },
        to: { id: '233', name: 'John Doe' },
        lastMessage: 'This was the last message',
      },
      {
        from: { id: '123', name: 'Luis' },
        to: { id: '345', name: 'Jane Doe' },
        lastMessage: 'Ok. Thanks!',
      },
      {
        from: { id: '123', name: 'Luis' },
        to: { id: '35646', name: 'Jack Johnson' },
        lastMessage: 'Ok brow, let`s play this song',
      },
    ]);
  }, []);

  const navigateToDetail = useCallback(
    (chat: Chat) => {
      navigate('ChatMessages', { otherUserId: chat.to.id });
    },
    [navigate],
  );

  return (
    <Container>
      {chats.length === 0 ? (
        <NoChatsContainer>
          <Icon name="frown" size={150} color={NORMAL_TEXT_COLOR} />
          <NoChatsText>Parece que você ainda não tem conversas!</NoChatsText>
        </NoChatsContainer>
      ) : (
        <ChatsListView
          data={chats}
          keyExtractor={chat => chat.to.id}
          renderItem={({ item: chat }) => (
            <ChatContainer>
              <ChatButton onPress={() => navigateToDetail(chat)}>
                <ChatDestinationUser>{chat.to.name}</ChatDestinationUser>
                <ChatLastMessage>{chat.lastMessage}</ChatLastMessage>
              </ChatButton>
            </ChatContainer>
          )}
        />
      )}
    </Container>
  );
};

export default ChatsList;
