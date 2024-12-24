import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="hidden md:flex items-center gap-x-2">
      <img
        src="/logo.svg"
        width="40"
        height="40"
        alt="Logo"
        className="dark:hidden"
      />
      <img
        src="/logo-black.svg"
        width="40"
        height="40"
        alt="Logo"
        className="hidden dark:block"
      />
      <p className="font-semibold">NotionLite</p>
    </Link>
  );
}