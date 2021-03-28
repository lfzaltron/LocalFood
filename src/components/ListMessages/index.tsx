import React, { useRef } from 'react';
import { FlatList } from 'react-native';

import Message from '../../types/Message';

import {
  MessageList,
  MessageContainer,
  MessageText,
  MessageTextContainer,
} from './styles';

interface ListMessagesProps {
  messages: Message[];
  currentUserId: string;
}

const ListMessages: React.FC<ListMessagesProps> = ({
  messages,
  currentUserId,
}) => {
  const listRef = useRef<FlatList<Message>>(null);

  return (
    <MessageList
      ref={listRef}
      onContentSizeChange={() => listRef.current?.scrollToEnd()}
      data={messages}
      keyExtractor={message => message.id}
      renderItem={({ item: message }) => (
        <MessageContainer sent={currentUserId === message.from}>
          <MessageTextContainer sent={currentUserId === message.from}>
            <MessageText>{message.text}</MessageText>
          </MessageTextContainer>
        </MessageContainer>
      )}
    />
  );
};

export default ListMessages;
