import React, { useEffect, useState } from 'react';
import {
    Settings,
    User,
    Moon,
    Sun,
    Languages,
    Laptop,
    LogOut,
    ChevronRight,
    Smartphone,
    Mail,
    Lock,
    Trash2
} from 'lucide-react';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useAuth } from '../context/useAuth';
import { useSettings } from '@/hooks/use-options';
import { InputMailModal } from './mail-change-modal';
import { ModeToggle } from "@/components/mode-toggle"
import { InputPasswordModal } from './password-change-modal';
import { cn } from '@/lib/utils';

export const SettingsModal = () => {
    const { isOpen, onClose } = useSettings();
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('account');


    const { user, sendRecovryEmail, sendRecovryPassword } = useAuth();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const onEmailChange = (newEmail: string) => {
        console.log('New email:', newEmail);
        sendRecovryEmail(newEmail);
    };

    const onPasswordChange = (newPassword: string) => {
        console.log('Confirm password:', newPassword);
        sendRecovryPassword(newPassword);
    };


    return (
        <>
            {isOpen && (
                <div className="z-[99991] fixed inset-0 flex justify-center items-center bg-black bg-opacity-70"
                    onClick={handleOverlayClick}>
                    <div className="flex bg-[#fbfbfa] dark:bg-neutral-800 rounded-l-2xl h-[600px] overflow-hidden">
                        {/* Sidebar */}
                        <div className="px-[4px] pt-[10px] w-64">
                            <div className="space-y-1">
                                <h1 className='px-3 font-semibold text-muted-foreground text-sm'>Compte </h1>

                                <div className="flex items-center space-x-4 px-3 p-1 rounded-md w-full">
                                    <Avatar className="flex justify-center items-center bg-blue-500 rounded-full w-[20px] h-[20px] text-2xl text-muted-foreground">
                                        <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                                    </Avatar>
                                    <div>
                                        <p>{user?.name}</p>
                                        <p className='text-muted-foreground text-xs select-none'>{user?.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={`flex px-3 items-center w-full p-1 rounded-md ${activeTab === 'account' ? 'bg-gray-100 dark:bg-neutral-700' : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <User size={18} className="mr-2" />
                                    <p className={cn('text-sm font-sans',
                                        activeTab === 'account' && 'font-semibold'
                                    )}>Mon compte</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`flex px-3 items-center w-full p-1 rounded-md ${activeTab === 'preferences' ? 'bg-gray-100 dark:bg-neutral-700' : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <Settings size={18} className="mr-2" />
                                    <p className={cn('text-sm font-sans',
                                        activeTab === 'preferences' && 'font-semibold'
                                    )}>Mes paramètres</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* #efefed */}
                    <div className="flex bg-white dark:bg-[#202020] rounded-r-2xl w-[900px] h-[600px] overflow-hidden">
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeTab === 'account' && (
                                <div className="space-y-6 px-16 py-9">
                                    <h2 className="font-sans text-base">
                                        Mon compte
                                        <Separator className='bg-gray-200 dark:bg-neutral-700 mt-4' />
                                    </h2>


                                    <div className="flex items-center space-x-4 rounded-lg">
                                        <Avatar className="flex justify-center items-center bg-blue-500 rounded-full w-[60px] h-[60px] text-2xl text-muted-foreground">
                                            <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                                        </Avatar>
                                        <div>
                                            <p>Nom</p>
                                            <Input
                                                value={user?.name}
                                                onChange={() => { }}
                                                className="border-neutral-400 dark:border-[#3c3c3c] bg-neutral-50 dark:bg-[#2c2c2c] focus-within:shadow-[inset_0_0_0_1px_#2383e291,0_0_0_2px_#2383e259] px-2 border focus-visible:ring-0 focus-visible:ring-offset-0 h-7"
                                                placeholder="..."
                                            />
                                        </div>
                                    </div>

                                    <h2 className="!mt-10 font-sans text-base">
                                        Sécurité du compte
                                        <Separator className='bg-gray-200 dark:bg-neutral-700 mt-4' />
                                    </h2>

                                    <div className="space-y-4">
                                        <InputMailModal onConfirm={onEmailChange} title="Changer d'adresse e-mail" description="Entrez votre nouvelle adresse e-mail" placeholder={user?.email}>
                                            <button className="flex justify-between items-center p-3 border rounded-lg w-full">
                                                <div className="flex justify-center items-center">
                                                    <Mail className="mr-3" size={20} />
                                                    <div className='flex flex-col items-start'>
                                                        <span>Email</span>
                                                        <p className='text-muted-foreground text-xs'>{user?.email}</p>
                                                    </div>
                                                </div>
                                                <div className='flex justify-center items-center border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-700 px-3 border rounded-lg w-auto h-[32px]'>
                                                    <span className=''>Changer d'adresse e-mail</span>
                                                </div>
                                            </button>
                                        </InputMailModal>

                                        <InputPasswordModal onConfirm={onPasswordChange} title="Changer le mot de passe" description="Entrez votre nouveau mot de passe">
                                            <button className="flex justify-between items-center hover:bg-gray-50 dark:hover:bg-neutral-700 p-3 border rounded-lg w-full">
                                                <div className="flex items-center">
                                                    <Lock className="mr-3" size={20} />
                                                    <span>Changer le mot de passe</span>
                                                </div>
                                                <ChevronRight size={20} />
                                            </button>
                                        </InputPasswordModal>

                                        <Separator />

                                        <div className="flex justify-evenly items-center p-3 pt-4 border-t rounded-lg">
                                            <button className="flex items-center text-red-500 hover:text-red-600">
                                                <Trash2 className="mr-2" size={20} />
                                                Supprimer mon compte
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="space-y-6 px-16 py-9">
                                    <h2 className="font-sans text-base">
                                        Mes paramètres
                                        <Separator className='bg-gray-200 dark:bg-neutral-700 mt-4' />
                                    </h2>

                                    <div className="flex justify-between items-center space-y-5 pr-8 border">
                                        <div className="p-4 rounded-lg">
                                            <h3 className="mb-3 font-semibold">Apparence</h3>
                                            <span className="text-muted-foreground text-xs">
                                                Customizer a quoi ressemble votre expérience
                                            </span>
                                        </div>
                                        <ModeToggle />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}