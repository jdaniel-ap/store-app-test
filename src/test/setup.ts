import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';
import { createElement } from 'react';

interface MockRouterProps {
  children?: React.ReactNode;
  to?: string;
  [key: string]: unknown;
}

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  Link: ({ children, to, ...props }: MockRouterProps) =>
    createElement('a', { href: to, ...props }, children),
  BrowserRouter: ({ children }: MockRouterProps) =>
    createElement('div', {}, children),
  Route: ({ children }: MockRouterProps) => createElement('div', {}, children),
  Routes: ({ children }: MockRouterProps) => createElement('div', {}, children),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
