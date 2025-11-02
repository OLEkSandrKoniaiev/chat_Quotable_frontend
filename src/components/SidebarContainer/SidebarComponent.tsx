import { useState, useEffect } from 'react';

import SidebarHeaderComponent from '../SidebarHeaderContainer/SidebarHeaderComponent.tsx';
import ChatList from '../ChatListContainer/ChatListComponent.tsx';
import { chatService } from '../../services/chat.service.ts';
import type { IChat } from '../../interfaces/chat.interfaces.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { NewChatModal } from '../Modals/NewChatModal.tsx';
import styles from './SidebarComponent.module.css';

function SidebarComponent() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await chatService.getAll(debouncedSearchQuery);
        setChats(data);
      } catch (err: unknown) {
        console.error('Failed to fetch chats:', err);
        setError('Failed to load chats.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, [debouncedSearchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleOpenNewChatModal = () => {
    setIsNewChatModalOpen(true);
  };

  const handleCloseNewChatModal = () => {
    setIsNewChatModalOpen(false);
  };

  const handleChatCreated = (newChat: IChat) => {
    setChats((prevChats) => [newChat, ...prevChats]);
  };

  return (
    <>
      <SidebarHeaderComponent onSearchChange={handleSearchChange} />
      <hr />

      {searchQuery && (
        <div className={styles.buttonContainer}>
          <button onClick={handleOpenNewChatModal} className={styles.createChatButton}>
            + New Chat
          </button>
        </div>
      )}

      <ChatList chats={chats} isLoading={isLoading} error={error} />

      {isNewChatModalOpen && (
        <NewChatModal onClose={handleCloseNewChatModal} onChatCreated={handleChatCreated} />
      )}
    </>
  );
}

export default SidebarComponent;
