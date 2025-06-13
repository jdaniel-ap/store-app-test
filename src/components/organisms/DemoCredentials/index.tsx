import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TIMEOUT_DURATION = 2000;

function DemoCredentials() {
  const { t } = useTranslation();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), TIMEOUT_DURATION);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), TIMEOUT_DURATION);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-muted/50 border-muted mt-6 rounded-lg border p-4">
      <h4 className="text-muted-foreground mb-2 text-sm font-medium">
        {t('components.demoCredentials.title')}
      </h4>
      <div className="text-muted-foreground space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <p>
            <strong>{t('components.demoCredentials.email')}:</strong>{' '}
            john@mail.com
          </p>
          {copiedEmail ? (
            <div className="flex items-center gap-1 text-green-600">
              <Check className="h-3 w-3" />
              <span className="text-xs">
                {t('components.demoCredentials.copied')}
              </span>
            </div>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => copyToClipboard('john@mail.com', 'email')}
              className="h-6 w-6"
              type="button"
              aria-label={t('components.demoCredentials.copyEmail')}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p>
            <strong>{t('components.demoCredentials.password')}:</strong>{' '}
            changeme
          </p>
          {copiedPassword ? (
            <div className="flex items-center gap-1 text-green-600">
              <Check className="h-3 w-3" />
              <span className="text-xs">
                {t('components.demoCredentials.copied')}
              </span>
            </div>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => copyToClipboard('changeme', 'password')}
              className="h-6 w-6"
              type="button"
              aria-label={t('components.demoCredentials.copyPassword')}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DemoCredentials;
