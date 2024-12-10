import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { usePopup } from '@/context/popup-context';
import { useAuth } from '@/context/useAuth';

import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';


type Props = {};

type RegisterFromsInputs = {
    email: string;
    userName: string;
    password: string;
    confirmPassword?: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], "Passwords must match"),
});

const RegisterPage = (props: Props) => {
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFromsInputs>({ resolver: yupResolver(validation) });
    const popupRef = useRef<HTMLDivElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const [isMouseDownInside, setIsMouseDownInside] = useState(false);

    const { openPopup, closePopup, popupType, isOpen } = usePopup();

    const handleRegister = async (form: RegisterFromsInputs) => {
        try {
          await registerUser(form.email, form.userName, form.password);
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage("Invalid email or password");
        }
    };

    const handleOpenLoginPopup = () => {
      closePopup();
      setTimeout(() => {
          openPopup('login');
      }, 0);
  };
  
  const handleMouseDown = (event: React.MouseEvent) => {
        if (popupRef.current && popupRef.current.contains(event.target as Node)) {
            setIsMouseDownInside(true);
        } else {
            setIsMouseDownInside(false);
        }
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        if (!isMouseDownInside) {
            closePopup();
        }
    };

    return (
        <>
        {isOpen && popupType === 'register' && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-[#1F1F1F] bg-opacity-50 z-50"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div
              ref={popupRef}
              className={cn(
                "w-full max-w-md p-8 bg-white dark:bg-[#1F1F1F] border rounded-lg shadow-lg",
                { "border-red-500": errorMessage, "border-white dark:border-gray-500": !errorMessage }
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Register</h2>
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                      { "border-red-500": errors.email }
                    )}
                    type="email"
                    placeholder='exemple@example.com'
                    autoComplete='off'
                    id="email"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                      { "border-red-500": errors.userName }
                    )}
                    type="text"
                    placeholder='your Username'
                    id="userName"
                    {...register('userName')}
                  />
                  {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                      { "border-red-500": errors.password }
                    )}
                    type="password"
                    placeholder='your Password'
                    id="password"
                    {...register('password')}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                      { "border-red-500": errors.confirmPassword }
                    )}
                    type="password"
                    placeholder='confirm your Password'
                    id="confirmPassword"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" variant="default" className="w-full">
                  Register
                </Button>
              </form>
              <Separator className='my-4 bg-gray-300 dark:bg-gray-600' />
              <div className='mt-4'>
                  <Button className="w-full" variant="ghost" onClick={handleOpenLoginPopup}>               
                    Already have an account? Sign In
                  </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default RegisterPage;