import React from 'react';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from '@/components/context/useTheme';
import Login from './components/Login';
import RegisterPage from './components/Register';
import { PopupProvider } from '@/components/context/popup-context';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Layout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <PopupProvider>
      <div className="h-full dark:bg-[#1F1F1F] relative">
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Login />
        <RegisterPage />
      </div>
      <ToastContainer />
    </PopupProvider>
  );
}

export default Layout;