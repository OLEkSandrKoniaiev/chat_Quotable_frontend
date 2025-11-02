import { Outlet } from 'react-router-dom';

import SidebarComponent from '../components/SidebarContainer/SidebarComponent.tsx';
import styles from './ChatLayout.module.css';

function ChatLayout() {
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <SidebarComponent />
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default ChatLayout;
