import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/context/useAuth';
import { useForm } from 'react-hook-form';
import { usePopup } from '@/context/popup-context';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { toast } from 'react-toastify';


type Props = {};

type LoginFromsInputs = {
    userName: string;
    password: string;
}

const validation = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LoginPage = (props: Props) => {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFromsInputs>({ resolver: yupResolver(validation) });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { openPopup, closePopup, popupType, isOpen } = usePopup();

    const handleLogin = async (form: LoginFromsInputs) => {
        try {
            await loginUser(form.userName, form.password);
            setErrorMessage(null); // Clear error message on successful login
        } catch (error) {
            setErrorMessage("Invalid username or password");
        }
    };

    const handleOpenRegisterPopup = () => {
        closePopup();
        setTimeout(() => {
            openPopup('register');
        }, 0);
    };

    return (
        <>
            {isOpen && popupType === 'login' && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-[#1F1F1F] bg-opacity-50 z-50"
                    onClick={closePopup}
                >
                    <div className={cn(
                        "w-full max-w-md p-8 bg-white dark:bg-[#1F1F1F] border rounded-lg shadow-lg",
                        { "border-red-500": errorMessage, "border-white dark:border-gray-500": !errorMessage }
                    )}
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing the popup
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                            {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
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
                                {errors.userName ? <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p> : ""}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <input
                                    className={cn("mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                                        { "border-red-500": errors.password }
                                    )}
                                    type="password"
                                    placeholder='your Password'
                                    id="password"
                                    {...register('password')}
                                />
                                {errors.password ? <p className="text-red-500 text-xs mt-1">{errors.password.message}</p> : ""}
                            </div>
                            <Button type="submit" variant="default" className="w-full">
                                Login
                            </Button>
                        </form>
                        <Separator className='my-4' />
                        <div className='mt-4'>
                            <Button className="w-full" variant="ghost" onClick={handleOpenRegisterPopup}>
                                Can't Sign In? Create an account
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LoginPage;