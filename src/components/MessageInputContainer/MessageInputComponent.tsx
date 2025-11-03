import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { chatApi } from '../../store/services/chatApi.ts';
import { useDispatch } from 'react-redux';
import { messageApi, useCreateMessageMutation } from '../../store/services/messageApi.ts';
import styles from './MessageInputComponent.module.css';

const MessageInputComponent = () => {
  const [content, setContent] = useState('');
  const { chatId } = useParams<{ chatId: string }>();

  const [createMessage, { isLoading }] = useCreateMessageMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatId || content.trim() === '' || isLoading) {
      return;
    }

    try {
      await createMessage({ chatId, dto: { content } }).unwrap();
      setContent('');

      dispatch(chatApi.util.invalidateTags([{ type: 'Chat', id: 'LIST' }]));
      setTimeout(() => {
        dispatch(messageApi.util.invalidateTags([{ type: 'Message', id: `LIST-${chatId}` }]));

        dispatch(chatApi.util.invalidateTags([{ type: 'Chat', id: 'LIST' }]));
      }, 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as FormEvent);
    }
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.inputField}
          placeholder={'Type your message'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || !chatId}
        />

        <button
          type="submit"
          className={styles.sendButton}
          disabled={isLoading || content.trim() === ''}
        >
          {/* SVG paper aircraft */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInputComponent;
