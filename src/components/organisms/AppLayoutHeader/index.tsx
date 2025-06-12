import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AppLayoutHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  className?: string;
  center?: boolean;
}

export function AppLayoutHeader({
  title,
  subtitle,
  backTo,
  backLabel = 'navigation.home',
  className = '',
  center = false,
}: AppLayoutHeaderProps) {
  return (
    <header className={`mb-8 px-8 md:px-20 ${className}`}>
      {backTo && (
        <div className="mb-4 flex items-center gap-4">
          <Link to={backTo}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Button>
          </Link>
        </div>
      )}

      <h1
        className={`mb-2 text-4xl font-bold text-white ${center ? 'mx-auto' : ''}`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={`text-lg text-gray-300 ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}

export default AppLayoutHeader;
