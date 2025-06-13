import UturnLogo from '@/assets/images/logos/colorfull-logo.svg?react';

function Loader() {
  return (
    <div className="animate-pulse" data-testid="loader">
      <UturnLogo className="size-40 text-gray-400" />
    </div>
  );
}

export default Loader;
