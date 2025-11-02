import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileComponent from './UserProfileComponent.tsx';
import SearchBarComponent from './SearchBarComponent.tsx';
import { userService } from '../../services/user.service.ts';
import type { IUser } from '../../interfaces/user.interfaces.ts';

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

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading profile...</div>; // TODO: Замінити на скелетон
  }

  if (!user) {
    return (
      <div>
        Error loading profile. <button onClick={handleLogout}>Log in again</button>
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
        onEdit={handleEdit}
      />

      <SearchBarComponent onSearchChange={onSearchChange} />

      {/* {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setEditModalOpen(false)}
        />
      )} */}
    </div>
  );
}

export default SidebarHeaderComponent;
