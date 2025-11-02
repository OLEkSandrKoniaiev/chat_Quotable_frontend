import { useState, type FC, type ChangeEvent } from 'react';
import styles from './SearchBarComponent.module.css';

interface SearchBarProps {
  onSearchChange?: (query: string) => void;
}

const SearchBarComponent: FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.searchIcon}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        placeholder={'Search or start new chat'}
        value={searchQuery}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBarComponent;
