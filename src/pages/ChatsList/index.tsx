import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '../../hooks/auth';
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
  id: string;
  otherUser: { id: string; name: string };
  lastMessage: string;
}

const ChatsList: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { navigate } = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      // TODO: Adicionar um activity indicator
      // TODO: SetLoading(true);
      const chatsCollection = await firestore()
        .collection('Chats')
        .where('users', 'array-contains', user.id)
        .get();

      const chatsArray = chatsCollection.docs.map(async doc => {
        const chat: Chat = {
          id: doc.id,
          otherUser: { id: '', name: '' },
          lastMessage: '',
        };

        const id = doc
          .data()
          .users.find((userId: string) => userId !== user.id);

        const otherUserPromise = firestore()
          .collection('Users')
          .doc(id)
          .get()
          .then(otherUserDoc => {
            chat.otherUser = { id, name: otherUserDoc.data()?.name };
          });

        const lastMessagePromise = doc.ref
          .collection('Messages')
          .orderBy('dateTime', 'desc')
          .limit(1)
          .get()
          .then(messagesCollection => {
            chat.lastMessage = messagesCollection.docs.pop()?.data().text;
          });

        await Promise.all([otherUserPromise, lastMessagePromise]);

        return chat;
      });

      const teste = await Promise.all(chatsArray);

      setChats(teste);
      // TODO: setLoading(false);
    })();
  }, [user]);

  const navigateToDetail = useCallback(
    (chat: Chat) => {
      navigate('ChatMessages', {
        chatId: chat.id,
        otherUserId: chat.otherUser.id,
        otherUserName: chat.otherUser.name,
      });
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
          keyExtractor={chat => chat.id}
          renderItem={({ item: chat }) => (
            <ChatContainer>
              <ChatButton onPress={() => navigateToDetail(chat)}>
                <ChatDestinationUser>{chat.otherUser.name}</ChatDestinationUser>
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
