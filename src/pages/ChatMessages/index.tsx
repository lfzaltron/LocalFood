import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

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
  otherUserId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  const route = useRoute();
  const { otherUserId } = route.params as ChatMessagesRouteParams;

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle: () => <Header>O nome da pessoa</Header>,
        headerBackTitleVisible: false,
      }),
    [navigation],
  );

  useEffect(() => {
    setMessages([
      {
        id: '111',
        text: 'Bom dia, tudo bem?',
        from: { id: user.id, name: user.name },
        to: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '112',
        text: 'Tudo bem, e você?',
        to: { id: user.id, name: user.name },
        from: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '113',
        text:
          'Gostaria de saber qual o valor se eu comprar 3 ítens e se você tem como entregar no bairro cidade baixa',
        to: { id: user.id, name: user.name },
        from: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '114',
        text:
          'Gostaria de saber qual o valor se eu comprar 3 ítens e se você tem como entregar no bairro cidade baixa',
        from: { id: user.id, name: user.name },
        to: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '115',
        text: 'Entrego sim. \nProdutos 35,00 \nEntrega 12,00 \nTotal 47,00',
        to: { id: user.id, name: user.name },
        from: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '116',
        text: 'Bom dia, tudo bem?',
        from: { id: user.id, name: user.name },
        to: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '117',
        text: 'Tudo bem, e você?',
        to: { id: user.id, name: user.name },
        from: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '118',
        text:
          'Gostaria de saber qual o valor se eu comprar 3 ítens e se você tem como entregar no bairro cidade baixa',
        to: { id: user.id, name: user.name },
        from: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '119',
        text:
          'Gostaria de saber qual o valor se eu comprar 3 ítens e se você tem como entregar no bairro cidade baixa',
        from: { id: user.id, name: user.name },
        to: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
      {
        id: '120',
        text: 'Entrego sim. \nProdutos 35,00 \nEntrega 12,00 \nTotal 47,00',
        to: { id: user.id, name: user.name },
        from: { id: otherUserId, name: 'O Cara que Vende' },
        dateTime: new Date(),
      },
    ]);
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
