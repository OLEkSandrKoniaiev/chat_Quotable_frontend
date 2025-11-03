import { type FC, useRef, useEffect, type UIEvent } from 'react';

import type { IMessage } from '../../interfaces/message.interfaces.ts';
import MessageListItemComponent from './MessageListItemComponent.tsx';
import type { IChat } from '../../interfaces/chat.interfaces.ts';
import styles from './MessageListComponent.module.css';

interface MessageListProps {
  messages: IMessage[];
  isLoading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  chat: IChat | null;
}

const MessageListComponent: FC<MessageListProps> = ({
  messages,
  isLoading,
  hasNextPage,
  onLoadMore,
  chat,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef(0);

  useEffect(() => {
    if (listRef.current) {
      scrollRef.current = listRef.current.scrollHeight - listRef.current.scrollTop;
    }
  }, [messages.length]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight - scrollRef.current;
    }
  }, [messages.length]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;

    if (scrollTop === 0 && hasNextPage && !isLoading) {
      onLoadMore();
    }
  };

  return (
    <div className={styles.messageListContainer} ref={listRef} onScroll={handleScroll}>
      {isLoading && hasNextPage && <div className={styles.loader}>Loading older messages...</div>}

      {messages.map((message) => (
        <div
          key={message._id}
          className={`${styles.messageWrapper} ${
            message.sender === 'user' ? styles.user : styles.bot
          }`}
        >
          <MessageListItemComponent
            message={message}
            chatAvatarUrl={chat?.avatarUrl}
            chatFirstName={chat?.firstName}
          />
        </div>
      ))}
    </div>
  );
};

export default MessageListComponent;
