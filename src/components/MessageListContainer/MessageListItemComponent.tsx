import { type FC, useState, type KeyboardEvent } from 'react';

import AvatarComponent from '../AvatarContainer/AvatarComponent.tsx';
import { dateToMDYH12M } from '../../utils/formatDate.ts';
import type { IMessage } from '../../interfaces/message.interfaces.ts';
import { useUpdateMessageMutation } from '../../store/services/messageApi.ts';
import styles from './MessageListItemComponent.module.css';

interface MessageListItemProps {
  message: IMessage;
  chatAvatarUrl?: string;
  chatFirstName?: string;
}

const MessageListItemComponent: FC<MessageListItemProps> = ({
  message,
  chatAvatarUrl,
  chatFirstName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.content);

  const [updateMessage, { isLoading }] = useUpdateMessageMutation();

  const handleUpdate = async () => {
    if (editText.trim() === '' || editText === message.content) {
      setIsEditing(false);
      return;
    }

    try {
      await updateMessage({
        messageId: message._id,
        dto: { content: editText },
      }).unwrap();
    } catch (err) {
      console.error('Failed to update message:', err);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(message.content);
      setIsEditing(false);
    }
  };

  const isModified = message.updatedAt !== message.createdAt;

  return (
    <div className={styles.messageItemRow}>
      {message.sender === 'bot' && (
        <div className={styles.avatarContainer}>
          <AvatarComponent
            firstName={chatFirstName || 'Bot'}
            avatarUrl={chatAvatarUrl}
            isOnline={false}
          />
        </div>
      )}

      <div
        className={`${styles.bubble} ${
          message.sender === 'user' ? styles.userBubble : styles.botBubble
        }`}
      >
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleUpdate}
            autoFocus
            disabled={isLoading}
            className={styles.editInput}
          />
        ) : (
          <span className={styles.messageContent}>{message.content}</span>
        )}

        <div className={styles.meta}>
          {isModified && <span title={message.updatedAt}>Modified </span>}
          <span title={message.createdAt}>{dateToMDYH12M(message.createdAt)}</span>
        </div>
      </div>

      {message.sender === 'user' && !isEditing && (
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default MessageListItemComponent;
