import React, { useState, type FormEvent } from 'react';
import { chatService } from '../../services/chat.service.ts';
import type { IChat } from '../../interfaces/chat.interfaces.ts';
import { isAxiosError } from 'axios';

// [1] Використовуємо спільні стилі
import styles from './Modal.module.css';

interface NewChatModalProps {
  onClose: () => void;
  // Функція зворотного виклику, щоб оновити список чатів у батька
  onChatCreated: (newChat: IChat) => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({ onClose, onChatCreated }) => {
  // [2] Локальний стан для полів форми
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // [3] Викликаємо сервіс
      const newChat = await chatService.create({
        firstName,
        lastName: lastName || undefined,
      });

      onChatCreated(newChat); // [4] Повертаємо новий чат батьківському компоненту
      onClose(); // Закриваємо модалку
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Failed to create chat.');
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // [5] Використовуємо спільні класи для фону та контенту
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3>Create New Chat</h3>
        <hr className={styles.divider} />

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              type="text"
              placeholder="Contact's first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last Name (optional)</label>
            <input
              id="lastName"
              type="text"
              placeholder="Contact's last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>

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
              type="submit"
              className={styles.confirmButton}
              disabled={isLoading || !firstName}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
