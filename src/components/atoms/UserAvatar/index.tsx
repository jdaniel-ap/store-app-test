import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  imageUrl?: string;
  name?: string;
  className?: string;
}

function UserAvatar({ imageUrl, name, className }: UserAvatarProps) {
  const getInitials = () => {
    if (!name) return 'UK';
    const names = name.split(' ');
    if (names.length === 1) {
      return (
        names[0].charAt(0).toUpperCase() + names[0].charAt(1).toUpperCase()
      );
    }
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  };
  return (
    <Avatar className={cn('rounded-full', className)}>
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
