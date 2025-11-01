import SidebarHeaderComponent from './SidebarHeader/SidebarHeaderComponent.tsx';
import ChatList from './ChatListContainer/ChatListComponent.tsx';

function ChatSidebarComponent() {
  return (
    <>
      <SidebarHeaderComponent />
      <hr />
      <ChatList />
    </>
  );
}

export default ChatSidebarComponent;
