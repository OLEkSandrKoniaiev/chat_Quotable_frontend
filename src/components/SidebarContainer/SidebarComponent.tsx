import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import SidebarHeaderComponent from '../SidebarHeaderContainer/SidebarHeaderComponent.tsx';
import ChatList from '../ChatListContainer/ChatListComponent.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { NewChatModal } from '../Modals/NewChatModal.tsx';
import { useGetChatsQuery } from '../../store/services/chatApi.ts';
import styles from './SidebarComponent.module.css';
import type { IChat } from '../../interfaces/chat.interfaces.ts';

function SidebarComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const {
    data: chats = [],
    isLoading,
    error,
  } = useGetChatsQuery(debouncedSearchQuery, {
    pollingInterval: 5000,
  });

  const prevChatsRef = useRef<IChat[]>([]);

  useEffect(() => {
    if (isLoading || prevChatsRef.current.length === 0) {
      prevChatsRef.current = chats;
      return;
    }

    for (const newChat of chats) {
      const oldChat = prevChatsRef.current.find((c) => c._id === newChat._id);

      if (oldChat && newChat.lastMessageTimestamp !== oldChat.lastMessageTimestamp) {
        if (newChat.unreadCount > 0) {
          toast.info(
            <div>
              <strong>
                {newChat.firstName} {newChat.lastName}
              </strong>
              <br />
              {newChat.lastMessage}
            </div>,
          );
        }

        break;
      }
    }

    prevChatsRef.current = chats;
  }, [chats, isLoading]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleOpenNewChatModal = () => {
    setIsNewChatModalOpen(true);
  };

  const handleCloseNewChatModal = () => {
    setIsNewChatModalOpen(false);
  };

  return (
    <>
      <SidebarHeaderComponent onSearchChange={handleSearchChange} />
      <hr />

      {searchQuery && (
        <div className={styles.buttonContainer}>
          <button onClick={handleOpenNewChatModal} className={styles.createChatButton}>
            New Chat
          </button>
        </div>
      )}

      <ChatList chats={chats} isLoading={isLoading} error={error ? 'Failed to load chats' : null} />

      {isNewChatModalOpen && <NewChatModal onClose={handleCloseNewChatModal} />}
    </>
  );
}

export default SidebarComponent;
