import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { RefreshControl } from 'react-native';
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
  lastMessageDate: Date;
}

const ChatsList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const route = useRoute();
  useEffect(() => {
    if (route.params !== undefined) navigate('ChatMessages', route.params);
  }, [route.params, navigate]);

  const onChatsChange = useCallback(
    async (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
      setLoading(true);
      const chatsArray = snapshot.docs.map(async doc => {
        let lastMessageDate = new Date();
        try {
          lastMessageDate = doc.data().lastMessage.toDate();
        } catch {}
        const chat: Chat = {
          id: doc.id,
          otherUser: { id: '', name: '' },
          lastMessage: '',
          lastMessageDate,
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

      const unorderedChats = await Promise.all(chatsArray);

      setChats(
        unorderedChats.sort(
          (a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime(),
        ),
      );
      setLoading(false);
    },
    [user.id],
  );

  const loadChats = useCallback(() => {
    const subscriber = firestore()
      .collection('Chats')
      .where('users', 'array-contains', user.id)
      .onSnapshot(onChatsChange, () => {});
    return () => subscriber();
  }, [onChatsChange, user.id]);

  useEffect(() => {
    return loadChats();
  }, [loadChats]);

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
      {chats.length === 0 && !loading ? (
        <NoChatsContainer>
          <Icon name="frown" size={150} color={NORMAL_TEXT_COLOR} />
          <NoChatsText>Parece que você ainda não tem conversas!</NoChatsText>
        </NoChatsContainer>
      ) : (
        <ChatsListView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadChats} />
          }
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
