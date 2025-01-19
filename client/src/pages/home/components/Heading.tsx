import React from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowRight } from 'lucide-react';
import { usePopup } from '@/components/context/popup-context';

export const Heading: React.FC = () => {
  const { openPopup } = usePopup();
  return (
    <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
          Vos Idées, Documents, et Projets, en un seul endroit.
        </p>
        <Button
          size="sm"
          className="mx-auto md:mx-0"
          onClick={() => openPopup('login')}
        >
          Commencer Bookly
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
  );
};