import type { FC } from 'react';

import type { IChat } from '../../interfaces/chat.interfaces.ts';
import ChatListItem from './ChatListItemComponent.tsx';
import styles from './ChatListComponent.module.css';

interface ChatListProps {
  chats: IChat[];
  isLoading: boolean;
  error: string | null;
}

const ChatListComponent: FC<ChatListProps> = ({ chats, isLoading, error }) => {
  if (isLoading) {
    return <div className={styles.statusMessage}>Loading chats...</div>;
  }

  if (error) {
    return <div className={`${styles.statusMessage} ${styles.error}`}>Error: {error}</div>;
  }

  if (chats.length === 0) {
    return <div className={styles.statusMessage}>No chats found.</div>;
  }

  return (
    <>
      <h3 className={styles.listTitle}>Chats</h3>

      <ul className={styles.chatList}>
        {chats.map((chat) => (
          <ChatListItem key={chat._id} {...chat} />
        ))}
      </ul>
    </>
  );
};

export default ChatListComponent;
