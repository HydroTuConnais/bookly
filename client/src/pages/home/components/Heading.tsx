import React from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowRight } from 'lucide-react';
import { usePopup } from '@/components/context/popup-context';

export const Heading: React.FC = () => {
  const { openPopup } = usePopup();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
        Vos Idées, Documents, et Projets, en un seul endroit. Bienvenue sur <span className="underline">NotionLite</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion Lite est une application de gestion de projets et de documents qui vous permet de centraliser vos idées, documents, et projets en un seul endroit.
      </h3>
      <Button size="sm" onClick={() => openPopup('login')}>
        Commencer NotionLite
        <ArrowRight className="h-4 w-4 ml-2" /> 
      </Button>
    </div>
  );
};