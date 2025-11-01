import { useEffect, useState } from 'react';
import type { IChat } from '../../interfaces/chat.interfaces.ts';
import { chatService } from '../../services/chat.service.ts';
import ChatListItem from './ChatListItemComponent.tsx';

const ChatList = () => {
  const [chats, setChats] = useState<IChat[]>([]);

  useEffect(() => {
    chatService
      .getAll()
      .then((data) => setChats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {chats.map((chat) => (
        <ChatListItem key={chat._id} {...chat} />
      ))}
    </ul>
  );
};

export default ChatList;
