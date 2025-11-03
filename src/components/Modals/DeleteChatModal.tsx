import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteChatMutation } from '../../store/services/chatApi.ts';
import styles from './Modal.module.css';

interface DeleteChatModalProps {
  chatId: string;
  chatName: string;
  onClose: () => void;
}

export const DeleteChatModal: FC<DeleteChatModalProps> = ({ chatId, chatName, onClose }) => {
  const navigate = useNavigate();

  const [deleteChat, { isLoading, error: apiError }] = useDeleteChatMutation();
  const error = apiError ? (apiError as any).data?.error : null;

  const handleDelete = async () => {
    try {
      await deleteChat(chatId).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3>Delete Chat</h3>
        <hr className={styles.divider} />

        <div className={styles.modalForm}>
          <p style={{ textAlign: 'center', margin: '10px 0', fontSize: '1.1rem' }}>
            Are you sure you want to delete this chat:
            <strong style={{ marginLeft: '5px' }}>{chatName}</strong>?
          </p>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
