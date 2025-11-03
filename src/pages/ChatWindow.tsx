import { useParams } from 'react-router-dom';

import { useGetChatByIdQuery } from '../store/services/chatApi.ts';
import { useGetMessagesByChatIdQuery } from '../store/services/messageApi.ts';

import ChatHeaderComponent from '../components/ChatHeaderContainer/ChatHeaderComponent.tsx';
import MessageListComponent from '../components/MessageListContainer/MessageListComponent.tsx';
import MessageInputComponent from '../components/MessageInputContainer/MessageInputComponent.tsx';
import styles from './Chat.module.css';

function ChatWindow() {
  const { chatId } = useParams<{ chatId: string }>();

  const {
    data: chat,
    isLoading: chatLoading,
    error: chatError,
  } = useGetChatByIdQuery(chatId!, { skip: !chatId });

  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = useGetMessagesByChatIdQuery(
    { chatId: chatId!, options: { page: 1, limit: 30 } },
    { skip: !chatId },
  );

  const isLoading = chatLoading || messagesLoading;
  const error = chatError || messagesError;

  if (isLoading) {
    return <div className={styles.statusMessage}>Loading chat...</div>;
  }

  if (error) {
    return <div className={styles.statusMessage}>Failed to load chat.</div>;
  }

  if (!chat) {
    return <div className={styles.statusMessage}>Chat not found.</div>;
  }

  return (
    <div className={styles.chatWindowContainer}>
      <ChatHeaderComponent {...chat} />
      <MessageListComponent messages={messagesData?.data || []} isLoading={isLoading} />
      <MessageInputComponent />
    </div>
  );
}

export default ChatWindow;
