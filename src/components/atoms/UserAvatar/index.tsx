import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserAvatar({ imageUrl, name }: { imageUrl?: string; name?: string }) {
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
    <Avatar className="rounded-full">
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
