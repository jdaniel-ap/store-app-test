import BlackHole from '@/assets/images/black-hole.svg?react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

function Empty() {
  const navigate = useNavigate();
  return (
    <main className="flex size-full flex-col items-center justify-center lg:flex-col">
      <BlackHole className="size-96" />
      <h1 className="mt-4 text-2xl font-bold">Página Não Encontrada</h1>
      <p className="mt-2 mb-2 text-gray-600">
        A página que você está procurando não existe.
      </p>
      <Button onClick={() => navigate('/')}>Voltar ao home</Button>
    </main>
  );
}

export default Empty;
