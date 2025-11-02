import React from 'react';

import styles from './UserProfileComponent.module.css';
import AvatarComponent from '../AvatarContainer/AvatarComponent.tsx';

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
  return (
    <div className={styles.profileContainer}>
      <AvatarComponent avatarUrl={avatarUrl} firstName={firstName} isOnline={true} />

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
