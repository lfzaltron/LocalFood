import React, { useEffect, useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { useAuth } from '../../hooks/auth';
import ListMessages from '../../components/ListMessages';
import Header from '../../components/Header';
import Message from '../../types/Message';

import { InputContainer, MessageTextInput, SendButton } from './styles';
import { DARK_TEXT_COLOR } from '../../constants';

interface ChatMessagesProps {
  navigation: {
    setOptions(options: StackNavigationOptions): void;
  };
}

interface ChatMessagesRouteParams {
  chatId: string;
  otherUserId: string;
  otherUserName: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  const route = useRoute();
  const {
    chatId,
    otherUserId,
    otherUserName,
  } = route.params as ChatMessagesRouteParams;

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => <Header>{otherUserName}</Header>,
        headerBackTitleVisible: false,
      }),
    [navigation, otherUserName],
  );

  const onMessagesChange = useCallback(
    (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
      setMessages(
        snapshot.docs.map(
          message =>
            ({
              id: message.id,
              ...message.data(),
            } as Message),
        ),
      );
    },
    [],
  );

  useEffect(() => {
    firestore()
      .collection('Chats')
      .doc(chatId)
      .get()
      .then(snapshot => {
        snapshot.ref
          .collection('Messages')
          .orderBy('dateTime')
          .onSnapshot(onMessagesChange);
      });
  }, [otherUserId, user]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
      enabled
    >
      <ListMessages currentUserId={user.id} messages={messages} />
      <InputContainer>
        <MessageTextInput multiline autoCorrect autoCapitalize="sentences" />
        <SendButton>
          <Icon name="send" size={20} color={DARK_TEXT_COLOR} />
        </SendButton>
      </InputContainer>
    </KeyboardAvoidingView>
  );
};

export default ChatMessages;
