import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import Home from './index';
import { useAuthStore } from '@/stores';

vi.mock('@/stores', () => ({
  useAuthStore: vi.fn(),
}));

const mockUseAuthStore = vi.mocked(useAuthStore);

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is logged out', () => {
    it('shows only welcome message without user greeting', () => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        getProfile: vi.fn(),
        refreshAuth: vi.fn(),
        clearError: vi.fn(),
        setLoading: vi.fn(),
        accessToken: null,
        refreshToken: null,
        error: null,
      });

      render(<Home />);

      expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
      expect(screen.queryByText(/Hello,/)).not.toBeInTheDocument();
    });

    it('shows login button when user is not authenticated', () => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        getProfile: vi.fn(),
        refreshAuth: vi.fn(),
        clearError: vi.fn(),
        setLoading: vi.fn(),
        accessToken: null,
        refreshToken: null,
        error: null,
      });

      render(<Home />);

      const loginButton = screen.getByRole('button', { name: /Login/i });
      expect(loginButton).toBeInTheDocument();
    });

    it('does not show personalized content when not authenticated', () => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        getProfile: vi.fn(),
        refreshAuth: vi.fn(),
        clearError: vi.fn(),
        setLoading: vi.fn(),
        accessToken: null,
        refreshToken: null,
        error: null,
      });

      render(<Home />);

      expect(screen.queryByText(/Hello,/)).not.toBeInTheDocument();
      expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
    });
  });

  describe('when user is logged in', () => {
    it('shows personalized welcome message with user name', () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      mockUseAuthStore.mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        getProfile: vi.fn(),
        refreshAuth: vi.fn(),
        clearError: vi.fn(),
        setLoading: vi.fn(),
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token',
        error: null,
      });

      render(<Home />);

      expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
      expect(screen.getByText('Hello, John Doe!')).toBeInTheDocument();
    });

    it('handles user with empty name when logged in', () => {
      const mockUser = {
        id: '3',
        name: '',
        email: 'user@example.com',
      };

      mockUseAuthStore.mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        getProfile: vi.fn(),
        refreshAuth: vi.fn(),
        clearError: vi.fn(),
        setLoading: vi.fn(),
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token',
        error: null,
      });

      render(<Home />);

      expect(screen.getByText('Hello, User!')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('does not show personalized greeting when authenticated but user is null', () => {
      mockUseAuthStore.mockReturnValue({
        user: null,
        isAuthenticated: true,
        isLoading: false,
        login: vi.fn(),
        logout: vi.fn(),
        getProfile: vi.fn(),
        refreshAuth: vi.fn(),
        clearError: vi.fn(),
        setLoading: vi.fn(),
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh-token',
        error: null,
      });

      render(<Home />);

      expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
      expect(screen.queryByText(/Hello,/)).not.toBeInTheDocument();
    });
  });

  it('renders within AppLayout', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      getProfile: vi.fn(),
      refreshAuth: vi.fn(),
      clearError: vi.fn(),
      setLoading: vi.fn(),
      accessToken: null,
      refreshToken: null,
      error: null,
    });

    render(<Home />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      getProfile: vi.fn(),
      refreshAuth: vi.fn(),
      clearError: vi.fn(),
      setLoading: vi.fn(),
      accessToken: null,
      refreshToken: null,
      error: null,
    });

    render(<Home />);

    const section = screen.getByRole('heading').closest('section');
    expect(section).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'px-4',
      'py-20'
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('mb-4', 'text-center', 'text-4xl', 'font-bold');
  });

  it('should have proper semantic structure', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      getProfile: vi.fn(),
      refreshAuth: vi.fn(),
      clearError: vi.fn(),
      setLoading: vi.fn(),
      accessToken: null,
      refreshToken: null,
      error: null,
    });

    render(<Home />);

    const section = screen.getByRole('heading').closest('section');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
