import { useState, type FormEvent, type FC } from 'react';
import { isAxiosError } from 'axios';
import { useCreateChatMutation } from '../../store/services/chatApi.ts';
import styles from './Modal.module.css';

interface NewChatModalProps {
  onClose: () => void;
}

export const NewChatModal: FC<NewChatModalProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [createChat, { isLoading, error: apiError }] = useCreateChatMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setFormError('First name is required.');
      return;
    }
    setFormError(null);

    try {
      await createChat({
        firstName,
        lastName: lastName || undefined,
      }).unwrap();
      onClose();
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setFormError(err.response.data.error || 'Failed to create chat.');
      } else {
        setFormError('An unknown error occurred.');
      }
    }
  };

  const error = formError || (apiError ? (apiError as any).data?.error : null);

  return (
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
