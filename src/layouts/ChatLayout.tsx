import { Outlet } from 'react-router-dom';

import ChatSidebarComponent from '../components/ChatSidebarComponent.tsx';
import styles from './ChatLayout.module.css';

function ChatLayout() {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <ChatSidebarComponent />
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default ChatLayout;
