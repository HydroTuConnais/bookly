import React from 'react';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from '@/context/theme-context';
import Login from './components/Login';
import { PopupProvider } from '@/context/popup-context';

const Layout = ({ 
  children 
} : {
  children: React.ReactNode;
}) => {
  return (
    <PopupProvider>
      <ThemeProvider>
        
        <div className="h-full dark:bg-[#1F1F1F]">
          <Navbar />
          <main className="min-h-screen pt-40">
            {children}
          </main>
        </div>
      </ThemeProvider>
      <Login />
    </PopupProvider>
  );
}

export default Layout;