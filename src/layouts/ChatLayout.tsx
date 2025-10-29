import { Outlet } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar.tsx';

function ChatLayout() {
  return (
    <>
      <h1>Chat Layout</h1>
      <hr />
      <ChatSidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ChatLayout;
