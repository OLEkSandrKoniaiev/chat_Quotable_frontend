import { useState, useRef, type FC, type ChangeEvent, type FormEvent } from 'react';
import type { IChat } from '../../interfaces/chat.interfaces.ts';
import styles from './Modal.module.css';

import {
  useUpdateChatMutation,
  useUploadChatAvatarMutation,
} from '../../store/services/chatApi.ts';

interface EditChatModalProps {
  chat: IChat;
  onClose: () => void;
}

export const EditChatModal: FC<EditChatModalProps> = ({ chat, onClose }) => {
  const [firstName, setFirstName] = useState(chat.firstName);
  const [lastName, setLastName] = useState(chat.lastName || '');
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateChat, { isLoading: isUpdatingInfo, error: infoError }] = useUpdateChatMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar, error: avatarError }] =
    useUploadChatAvatarMutation();

  const isUpdating = isUpdatingInfo || isUploadingAvatar;

  const error = formError || (infoError as any)?.data?.error || (avatarError as any)?.data?.error;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormError(null);
    try {
      await uploadAvatar({ chatId: chat._id, file }).unwrap();
    } catch (err) {
      console.error('Failed to upload photo:', err);
    }
  };

  const handleDeleteAvatar = async () => {
    setFormError(null);
    try {
      await updateChat({ chatId: chat._id, dto: { avatarUrl: '' } }).unwrap();
    } catch (err) {
      console.error('Failed to delete photo:', err);
    }
  };

  const handleTextSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      await updateChat({
        chatId: chat._id,
        dto: { firstName, lastName },
      }).unwrap();

      onClose();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const hasInfoChanged =
    firstName.trim() !== chat.firstName || lastName.trim() !== (chat.lastName || '');

  const getAvatarFallback = () => (
    <div className={`${styles.avatarPreviewImage} ${styles.avatarFallback}`}>
      {chat.firstName[0].toUpperCase()}
    </div>
  );

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBlock}>
          <h3>Edit Avatar</h3>
          <div className={styles.avatarPreview}>
            {chat.avatarUrl ? (
              <img src={chat.avatarUrl} alt="Chat Avatar" className={styles.avatarPreviewImage} />
            ) : (
              getAvatarFallback()
            )}
          </div>
          <div className={styles.avatarActions}>
            <button
              className={styles.uploadButton}
              onClick={handleUploadClick}
              disabled={isUpdating}
            >
              Upload Photo
            </button>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteAvatar}
              disabled={isUpdating || !chat.avatarUrl}
            >
              Delete Photo
            </button>
          </div>
        </div>

        <hr className={styles.divider} />

        <form className={styles.bottomBlock} onSubmit={handleTextSubmit}>
          <h3>Edit Info</h3>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.textInputs}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isUpdating}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isUpdating}
            />
            <button
              type="submit"
              className={styles.confirmButton}
              disabled={isUpdating || !hasInfoChanged}
            >
              {isUpdating ? 'Saving...' : 'Confirm'}
            </button>
          </div>
        </form>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelected}
          style={{ display: 'none' }}
          accept="image/png, image/jpeg, image/webp"
        />

        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
