import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/components/context/useAuth';
import { useForm } from 'react-hook-form';
import { usePopup } from '@/components/context/popup-context';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

type Props = {};

type LoginFromsInputs = {
    email: string;
    password: string;
}

const validation = Yup.object().shape({
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LoginPage = (props: Props) => {
    const { loginUser, sendRecovryPassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFromsInputs>({ resolver: yupResolver(validation) });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { openPopup, closePopup, popupType, isOpen } = usePopup();
    const popupRef = useRef<HTMLDivElement>(null);
    const [isMouseDownInside, setIsMouseDownInside] = useState(false);
    const [forgetPasswordEmail, setForgetPasswordEmail] = useState<string>('');

    const handleLogin = async (form: LoginFromsInputs) => {
        try {
            await loginUser(form.email, form.password);
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

    const handleOpenForgetPasswordPopup = () => {
        closePopup();
        setTimeout(() => {
            openPopup('forgetPassword');
        }, 0);
    };

    const handleForgetPasswordSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log("Forget password email: ", forgetPasswordEmail);
            await sendRecovryPassword(forgetPasswordEmail);
            setForgetPasswordEmail('');
            closePopup();
        } catch (error) {
            setErrorMessage("Failed to send reset email");
        }
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
            {isOpen && popupType === 'login' && (
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
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing the popup
                    >
                        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                            {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    className={cn(
                                        "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus-within:shadow-[inset_0_0_0_1px_#2383e291,0_0_0_2px_#2383e259] sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                                        { "border-red-500": errors.email }
                                    )}
                                    type="text"
                                    placeholder='your Email'
                                    id="email"
                                    {...register('email')}
                                />
                                {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : ""}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <input
                                    className={cn(
                                        "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus-within:shadow-[inset_0_0_0_1px_#2383e291,0_0_0_2px_#2383e259] sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100",
                                        { "border-red-500": errors.password }
                                    )}
                                    type="password"
                                    placeholder='your Password'
                                    id="password"
                                    {...register('password')}
                                />
                                {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password.message}</p> : ""}
                            </div>
                            <Button type="submit" variant="default" className="w-full">
                                Login
                            </Button>
                        </form>
                        <Separator className='my-4 bg-gray-300 dark:bg-gray-600' />
                        <div className='mt-4'>
                            <Button className="w-full" variant="ghost" onClick={handleOpenRegisterPopup}>
                                Vous ne pouvez pas vous connecter? Inscrivez-vous ici !
                            </Button>
                            <Button className="w-full" variant="ghost" onClick={handleOpenForgetPasswordPopup}>
                                Mots de passe oublié
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && popupType === 'forgetPassword' && (
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
                        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                            Réinitialiser le mot de passe
                        </h2>
                        <form onSubmit={handleForgetPasswordSubmit} className="space-y-6">
                            {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
                            <div>
                                <label htmlFor="forgetPasswordEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus-within:shadow-[inset_0_0_0_1px_#2383e291,0_0_0_2px_#2383e259] sm:text-sm bg-white dark:bg-[#1F1F1F] dark:text-gray-100"
                                    type="email"
                                    id="forgetPasswordEmail"
                                    placeholder="Entrez votre email"
                                    value={forgetPasswordEmail}
                                    onChange={(e) => setForgetPasswordEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" variant="default" className="w-full">
                                Envoyer le lien de réinitialisation
                            </Button>
                        </form>
                        <Separator className='my-4 bg-gray-300 dark:bg-gray-600' />
                        <div className='mt-4'>
                            <Button className="w-full" variant="ghost" onClick={() => openPopup('login')}>
                                Retour à la connexion
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LoginPage;