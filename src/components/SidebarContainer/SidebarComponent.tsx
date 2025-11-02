import { useState, useEffect } from 'react';
import SidebarHeaderComponent from './SidebarHeaderContainer/SidebarHeaderComponent.tsx';
import ChatList from './ChatListContainer/ChatListComponent.tsx';
import { chatService } from '../services/chat.service.ts';
import type { IChat } from '../interfaces/chat.interfaces.ts';
import { useDebounce } from '../hooks/useDebounce.ts';

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
    console.log('Opening new chat modal...');
  };

  // const handleCloseNewChatModal = () => {
  //   setIsNewChatModalOpen(false);
  // };

  return (
    <>
      <SidebarHeaderComponent onSearchChange={handleSearchChange} />

      <hr />

      {searchQuery && (
        <div style={{ padding: '10px' }}>
          <button onClick={handleOpenNewChatModal} style={{ width: '100%', padding: '10px' }}>
            + new chat
          </button>
        </div>
      )}

      <ChatList chats={chats} isLoading={isLoading} error={error} />

      {/* {isNewChatModalOpen && (
        <NewChatModal
          onClose={handleCloseNewChatModal}
          // onChatCreated={тут буде функція для оновлення списку чатів}
        />
      )} */}
    </>
  );
}

export default SidebarComponent;
