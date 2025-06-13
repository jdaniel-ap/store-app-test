import { Suspense, type ReactNode } from 'react';
import Loader from '@/components/atoms/Loader';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallbackHeight?: string;
  className?: string;
}

function SuspenseWrapper({
  children,
  fallbackHeight = 'h-32',
  className = '',
}: SuspenseWrapperProps) {
  return (
    <Suspense
      fallback={
        <div
          className={`flex items-center justify-center ${fallbackHeight} ${className}`}
        >
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default SuspenseWrapper;
