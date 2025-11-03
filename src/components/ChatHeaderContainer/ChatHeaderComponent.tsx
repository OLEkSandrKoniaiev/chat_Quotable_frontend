import { type FC, useState } from 'react';

import type { IChat } from '../../interfaces/chat.interfaces.ts';
import AvatarComponent from '../AvatarContainer/AvatarComponent.tsx';
import { EditChatModal } from '../Modals/EditChatModal.tsx';
import { DeleteChatModal } from '../Modals/DeleteChatModal.tsx';
import styles from './ChatHeaderComponent.module.css';

const ChatHeaderComponent: FC<IChat> = (chat) => {
  const { _id, firstName, lastName, avatarUrl } = chat;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.chatInfo}>
          <AvatarComponent firstName={firstName} avatarUrl={avatarUrl} isOnline={true} />
          <span className={styles.chatName}>
            {firstName} {lastName}
          </span>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.actionButton} onClick={() => setIsEditModalOpen(true)}>
            Edit
          </button>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {isEditModalOpen && <EditChatModal chat={chat} onClose={() => setIsEditModalOpen(false)} />}

      {isDeleteModalOpen && (
        <DeleteChatModal
          chatId={_id}
          chatName={`${firstName} ${lastName}`}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default ChatHeaderComponent;
