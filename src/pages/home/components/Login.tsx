import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '@/context/popup-context';
import { Button } from '@/ui/button';

const Login: React.FC = () => {
  const { isOpen, closePopup } = usePopup();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/app');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#1F1F1F] bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="w-full max-w-md p-8 bg-white dark:bg-[#1F1F1F] border border-white dark:border-gray-500 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100"
                  required
                />
              </div>
              <Button type="submit" variant="default" className="w-full">
                Login
              </Button>
            </form>
            <div className='mt-4'>
                <Button className="w-full" variant="ghost" onClick={closePopup}>               
                    Close
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;