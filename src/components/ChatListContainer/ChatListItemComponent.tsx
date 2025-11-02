import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { IChat } from '../../interfaces/chat.interfaces.ts';
import { dateToMDY } from '../../utils/formatDate.ts';
import AvatarComponent from '../AvatarContainer/AvatarComponent.tsx';
import styles from './ChatListItemComponent.module.css';

const ChatListItemComponent: FC<IChat> = ({
  _id,
  firstName,
  lastName,
  avatarUrl,
  lastMessage,
  lastMessageTimestamp,
  unreadCount,
}) => {
  return (
    <li className={styles.listItem}>
      <NavLink
        to={`/chat/${_id}`}
        className={({ isActive }) => `${styles.chatItemLink} ${isActive ? styles.active : ''}`}
      >
        <AvatarComponent avatarUrl={avatarUrl} firstName={firstName} isOnline={true} />

        <div className={styles.chatInfo}>
          <span className={styles.chatName}>
            {firstName} {lastName}
          </span>
          <span className={styles.lastMessage}>{lastMessage}</span>
        </div>

        <div className={styles.chatMeta}>
          <span className={styles.chatTimestamp}>
            {lastMessageTimestamp && dateToMDY(lastMessageTimestamp)}
          </span>

          {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
        </div>
      </NavLink>
    </li>
  );
};

export default ChatListItemComponent;
