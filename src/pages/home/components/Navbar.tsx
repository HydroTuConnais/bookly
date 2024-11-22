import React from 'react';
import { Logo } from './Logo';
import { cn } from '../../../lib/utils';

import { ModeToggle } from '../../../components/mode-toggle';
import { useScrollTop } from '../../../hooks/use-scroll-top';
import { Button } from '@/ui/button';
import { usePopup } from '@/context/popup-context';

export const Navbar: React.FC = () => {
  const scrolled = useScrollTop();
  const { openPopup } = usePopup();

  return (
    <div className={cn(
      "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm"
      )}>
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          <>
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button size="sm" onClick={openPopup}>
              Avoir NotionLite
            </Button>
            <ModeToggle />
          </>
        </div>
      </div>
  );
}