import React from 'react';

import styles from './UserProfileComponent.module.css';

interface UserProfileProps {
  avatarUrl?: string;
  firstName: string;
  lastName?: string;
  onLogout: () => void;
  onEdit: () => void;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({
  avatarUrl,
  firstName,
  lastName,
  onLogout,
  onEdit,
}) => {
  const getAvatarFallback = () => (
    <div className={styles.avatarFallback}>{firstName[0].toUpperCase()}</div>
  );

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.avatarWrapper} ${styles.avatarWrapperOnline}`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${firstName} avatar`} className={styles.avatarImage} />
        ) : (
          getAvatarFallback()
        )}
      </div>

      <div className={styles.userName}>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.actionButton} title="Edit">
          Edit
        </button>
        <button
          onClick={onLogout}
          className={`${styles.actionButton} ${styles.logoutButton}`}
          title="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileComponent;
