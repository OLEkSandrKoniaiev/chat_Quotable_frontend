import { useState } from 'react';

import SidebarHeaderComponent from '../SidebarHeaderContainer/SidebarHeaderComponent.tsx';
import ChatList from '../ChatListContainer/ChatListComponent.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { NewChatModal } from '../Modals/NewChatModal.tsx';
import { useGetChatsQuery } from '../../store/services/chatApi.ts';
import styles from './SidebarComponent.module.css';

function SidebarComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const { data: chats = [], isLoading, error } = useGetChatsQuery(debouncedSearchQuery);

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
