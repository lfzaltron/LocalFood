import React from 'react';

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
  return (
    <MessageList
      data={messages}
      keyExtractor={message => message.id}
      renderItem={({ item: message }) => (
        <MessageContainer sent={currentUserId === message.from.id}>
          <MessageTextContainer sent={currentUserId === message.from.id}>
            <MessageText>{message.text}</MessageText>
          </MessageTextContainer>
        </MessageContainer>
      )}
    />
  );
};

export default ListMessages;
