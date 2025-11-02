import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserProfileComponent from '../UserProfileContainer/UserProfileComponent.tsx';
import SearchBarComponent from '../SearchBarContainer/SearchBarComponent.tsx';
import { userService } from '../../services/user.service.ts';
import type { IUser } from '../../interfaces/user.interfaces.ts';
import { EditProfileModal } from '../Modals/EditProfileModal.tsx';
import styles from './SidebarHeaderComponent.module.css';

interface SidebarHeaderProps {
  onSearchChange: (query: string) => void;
}

function SidebarHeaderComponent({ onSearchChange }: SidebarHeaderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await userService.getMe();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleUpdateSuccess = (updatedUser: IUser) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className={styles.errorContainerStyle}>
        <span>Error loading profile.</span>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <UserProfileComponent
        avatarUrl={user.avatarUrl}
        firstName={user.firstName}
        lastName={user.lastName}
        onLogout={handleLogout}
        onEdit={handleOpenEditModal}
      />
      <SearchBarComponent onSearchChange={onSearchChange} />

      {isEditModalOpen && user && (
        <EditProfileModal
          user={user}
          onClose={() => setEditModalOpen(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

export default SidebarHeaderComponent;
