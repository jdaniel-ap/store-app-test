import Logo from '@/assets/images/logos/colorfull-logo.svg?react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';
import { useAuthStore } from '@/stores';
import { useTranslation } from 'react-i18next';
import UserAvatar from '@/components/atoms/UserAvatar';
import { SignInDialog, UserMenu } from '@/components/organisms';

function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  return (
    <header className="flex h-24 w-full items-center justify-between px-4 lg:px-20">
      <Logo className="h-20 w-40" />
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {isAuthenticated && user ? (
          <Button variant="ghost" size="icon">
            <UserMenu>
              <UserAvatar name={user.name} imageUrl={user.avatar} />
            </UserMenu>
          </Button>
        ) : (
          <SignInDialog>
            <Button>{t('navigation.login')}</Button>
          </SignInDialog>
        )}
      </div>
    </header>
  );
}

export default Header;
