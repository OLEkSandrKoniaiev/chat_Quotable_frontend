import { type FC } from 'react';
import styles from './AvatarComponent.module.css';

interface AvatarProps {
  avatarUrl?: string;
  firstName: string;
  isOnline?: boolean;
  className?: string;
}

const AvatarComponent: FC<AvatarProps> = ({
  avatarUrl,
  firstName,
  isOnline = false,
  className = '',
}) => {
  const initial = firstName ? firstName[0].toUpperCase() : '?';

  const fallback = <div className={styles.avatarFallback}>{initial}</div>;

  const wrapperClasses = [
    styles.avatarWrapper,
    isOnline ? styles.avatarWrapperOnline : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${firstName || 'user'} avatar`} className={styles.avatarImage} />
      ) : (
        fallback
      )}
    </div>
  );
};

export default AvatarComponent;
