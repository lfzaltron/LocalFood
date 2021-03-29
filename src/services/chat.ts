import firestore from '@react-native-firebase/firestore';

interface GetChatIdParams {
  fromId: string;
  toId: string;
}

interface SendMessageParams {
  chatId: string;
  fromId: string;
  toId: string;
  text: string;
}

export const getChatId = async ({
  fromId,
  toId,
}: GetChatIdParams): Promise<string> => {
  // Find an existing chat with these users
  const chatsCollection = await firestore()
    .collection('Chats')
    .where('users', 'array-contains', fromId)
    .get();

  const chatEncontrado = chatsCollection.docs.find(
    chat =>
      chat.data().users.find((user: string) => user === toId) !== undefined,
  );
  if (chatEncontrado !== undefined) return chatEncontrado.id;

  // When not found, create one
  const newChat = await firestore()
    .collection('Chats')
    .add({ users: [fromId, toId] });
  return newChat.id;
};

export const sendMessage = async ({
  chatId,
  fromId,
  toId,
  text,
}: SendMessageParams): Promise<any> => {
  const now = new Date();

  firestore().collection('Chats').doc(chatId).update({ lastMessage: now });

  return firestore()
    .collection('Chats')
    .doc(chatId)
    .collection('Messages')
    .add({
      from: fromId,
      to: toId,
      text,
      dateTime: now,
    });
};
