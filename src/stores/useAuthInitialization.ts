import { useEffect } from 'react';
import { useAuthStore } from './authStore';

export const useAuthInitialization = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const getProfile = useAuthStore((state) => state.getProfile);
  const refreshAuth = useAuthStore((state) => state.refreshAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!accessToken && !refreshToken) {
        return;
      }

      try {
        if (accessToken) {
          await getProfile();
        } else if (refreshToken) {
          await refreshAuth();
        }
      } catch (error) {
        console.error('Error initializing authentication:', error);
        logout();
      }
    };

    initializeAuth();
  }, [accessToken, refreshToken, getProfile, refreshAuth, logout]);

  return null;
};
