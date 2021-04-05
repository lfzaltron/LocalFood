import React, { useEffect, useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { sendMessage } from '../../services/chat';
import { useAuth } from '../../hooks/auth';
import ListMessages from '../../components/ListMessages';
import Header from '../../components/Header';
import Message from '../../types/Message';

import {
  InputContainer,
  MessageTextInput,
  SendButton,
  RateButton,
} from './styles';
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
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  const route = useRoute();
  const { navigate } = useNavigation();
  const {
    chatId,
    otherUserId,
    otherUserName,
  } = route.params as ChatMessagesRouteParams;

  const rateContact = useCallback(() => {
    navigate('Rate', {
      id: otherUserId,
      name: otherUserName,
    });
  }, [navigate, otherUserId, otherUserName]);

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => <Header>{otherUserName}</Header>,
        headerRight: () => {
          return (
            <RateButton onPress={rateContact}>
              <Icon name="star" size={24} color={DARK_TEXT_COLOR} />
            </RateButton>
          );
        },
      }),
    [navigation, otherUserName, rateContact],
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
    const subscriber = firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('Messages')
      .orderBy('dateTime')
      .onSnapshot(onMessagesChange, () => {});
    return () => subscriber();
  }, [chatId, onMessagesChange, otherUserId, user]);

  const handleSend = useCallback(() => {
    sendMessage({
      chatId,
      fromId: user.id,
      toId: otherUserId,
      text: currentMessage,
    }).then(() => setCurrentMessage(''));
  }, [chatId, currentMessage, otherUserId, user]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
      enabled
    >
      <ListMessages currentUserId={user.id} messages={messages} />
      <InputContainer>
        <MessageTextInput
          multiline
          autoCorrect
          autoCapitalize="sentences"
          value={currentMessage}
          onChangeText={setCurrentMessage}
        />
        <SendButton onPress={handleSend}>
          <Icon name="send" size={20} color={DARK_TEXT_COLOR} />
        </SendButton>
      </InputContainer>
    </KeyboardAvoidingView>
  );
};

export default ChatMessages;
