import styles from './Chat.module.css';

function ChatPlaceholder() {
  return (
    <div className={styles.chatPlaceholderContainer}>
      <span>Select a chat to start communicating</span>
    </div>
  );
}

export default ChatPlaceholder;
