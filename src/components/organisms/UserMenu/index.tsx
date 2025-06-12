import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/atoms';
import { useAuthStore } from '@/stores';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, LogOut, User, Settings } from 'lucide-react';
import type { PropsWithChildren } from 'react';

function UserMenu({ children }: PropsWithChildren) {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const handleViewCart = () => {
    console.log('Navigate to cart');
  };

  const handleViewProfile = () => {
    console.log('Navigate to profile');
  };

  const handleViewSettings = () => {
    console.log('Navigate to settings');
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-80 p-0">
        <SheetHeader className="space-y-4 p-6 pb-0">
          <SheetTitle className="text-left">{t('auth.profile')}</SheetTitle>
          <SheetDescription className="text-left">
            {t(
              'navigation.userMenuDescription',
              'Manage your account and preferences'
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-6 p-6">
            {user && (
              <div className="bg-muted/50 flex items-center space-x-4 rounded-lg p-4">
                <UserAvatar
                  name={user.name}
                  imageUrl={user.avatar}
                  className="h-12 w-12"
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-none font-medium">
                    {user.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground text-xs capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleViewProfile}
              >
                <User className="mr-3 h-4 w-4" />
                {t('auth.profile')}
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleViewCart}
              >
                <ShoppingCart className="mr-3 h-4 w-4" />
                {t('navigation.cart', 'Shopping Cart')}
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleViewSettings}
              >
                <Settings className="mr-3 h-4 w-4" />
                {t('auth.settings')}
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                {t('navigation.logout')}
              </Button>
            </div>
          </div>

          <div className="border-t p-6">
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-muted-foreground text-center text-xs">
                {t('navigation.version', 'Version')} 1.0.0
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UserMenu;
