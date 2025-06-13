import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import Logo from '@/assets/images/logos/colorfull-logo.svg?react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';
import { useAuthStore } from '@/stores';
import UserAvatar from '@/components/atoms/UserAvatar';
import { SignInDialog, UserMenu } from '@/components/organisms';

function AppLayout({ children }: PropsWithChildren) {
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <header
        data-testid="app-header"
        className="flex h-24 w-full items-center justify-between px-4 lg:px-20"
      >
        <Logo
          onClick={() => navigate('/')}
          className="h-20 w-40 cursor-pointer"
        />

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {isAuthenticated && user ? (
            <UserMenu>
              <UserAvatar
                name={user.name}
                imageUrl={user.avatar}
                data-testid="user-avatar"
              />
            </UserMenu>
          ) : (
            <SignInDialog>
              <Button data-testid="login">{t('navigation.login')}</Button>
            </SignInDialog>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-muted/10 border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} U-Turn. {t('footer.copyright')}.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
