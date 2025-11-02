import React, { useState } from 'react';

interface SearchBarProps {
  onSearchChange?: (query: string) => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        margin: '10px 0',
        borderRadius: '20px',
        backgroundColor: '#f0f2f5',
        border: '1px solid #e0e0e0',
      }}
    >
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
        style={{ color: '#65676b', marginRight: '8px' }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        placeholder={'Search or start new chat'}
        value={searchQuery}
        onChange={handleChange}
        style={{
          flexGrow: 1,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontSize: '16px',
          padding: '4px 0',
          color: '#1c1e21',
        }}
      />
    </div>
  );
};

export default SearchBarComponent;
