import { useState, useRef, type FC, type ChangeEvent, type FormEvent } from 'react';
import type { IUser } from '../../interfaces/user.interfaces.ts';
import { userService } from '../../services/user.service.ts';

import styles from './Modal.module.css';

interface EditProfileModalProps {
  user: IUser;
  onClose: () => void;
  onUpdateSuccess: (updatedUser: IUser) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({ user, onClose, onUpdateSuccess }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUpdating(true);
    try {
      const updatedUser = await userService.uploadAvatar(user._id, file);
      onUpdateSuccess(updatedUser);
    } catch (err) {
      setError('Failed to upload photo.');
      console.log('Error message:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setIsUpdating(true);
    try {
      const updatedUser = await userService.update(user._id, {
        avatarUrl: '',
      });
      onUpdateSuccess(updatedUser);
    } catch (err) {
      setError('Failed to delete photo.');
      console.log('Error message:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTextSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);
    try {
      const updatedUser = await userService.update(user._id, {
        firstName,
        lastName,
      });
      onUpdateSuccess(updatedUser);
    } catch (err) {
      setError('Failed to update profile.');
      console.log('Error message:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const hasInfoChanged =
    firstName.trim() !== user.firstName || lastName.trim() !== (user.lastName || '');

  const getAvatarFallback = () => (
    <div className={`${styles.avatarPreviewImage} ${styles.avatarFallback}`}>
      {user.firstName[0].toUpperCase()}
    </div>
  );

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBlock}>
          <h3>Edit Avatar</h3>
          <div className={styles.avatarPreview}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Profile Avatar"
                className={styles.avatarPreviewImage}
              />
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
              disabled={isUpdating || !user.avatarUrl}
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
