import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import type { IChat } from '../../interfaces/chat.interfaces.ts';
import { dateToMDY } from '../../utils/formatDate.ts';

const ChatListItem: FC<IChat> = ({
  _id,
  firstName,
  lastName,
  lastMessage,
  lastMessageTimestamp,
}) => {
  return (
    <li>
      <NavLink
        to={`/chat/${_id}`}
        className={({ isActive }) => (isActive ? 'chat-item active' : 'chat-item')}
      >
        <div>
          <span>{firstName}</span>
          {lastName && <span>{lastName}</span>}
          {lastMessage && lastMessageTimestamp && (
            <>
              <span>{lastMessage}</span>
              <span>{dateToMDY(lastMessageTimestamp)}</span>
            </>
          )}
          <hr />
        </div>
      </NavLink>
    </li>
  );
};

export default ChatListItem;
