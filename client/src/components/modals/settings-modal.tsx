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
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[99991]"
                    onClick={handleOverlayClick}>
                    <div className="bg-white dark:bg-neutral-800 rounded-l-2xl h-[600px] flex overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-64 p-2">
                            <div className="space-y-1">
                                <h1 className='px-3 text-sm font-semibold text-muted-foreground'>Compte </h1>

                                <div className="flex items-center w-full p-1 px-3 space-x-4 rounded-md">
                                    <Avatar className="w-[20px] h-[20px]  bg-blue-500 rounded-full flex items-center justify-center text-muted-foreground text-2xl">
                                        <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                                    </Avatar>
                                    <div>
                                        <p>{user?.name}</p>
                                        <p className='text-xs select-none text-muted-foreground'>{user?.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={`flex px-3 items-center w-full p-1 rounded-md ${activeTab === 'account' ? 'bg-gray-100 dark:bg-neutral-700' : 'hover:bg-gray-50 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <User size={18} className="mr-2" />
                                    Mon compte
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`flex px-3 items-center w-full p-1 rounded-md ${activeTab === 'preferences' ? 'bg-gray-100 dark:bg-neutral-700' : 'hover:bg-gray-50 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <Settings size={18} className="mr-2" />
                                    Mes paramètres
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#202020] w-[900px] h-[600px] rounded-r-2xl flex overflow-hidden">
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeTab === 'account' && (
                                <div className="px-16 space-y-6 py-9">
                                    <h2 className="font-sans text-base">
                                        Mon compte
                                        <Separator className='mt-4 bg-gray-200 dark:bg-neutral-700' />
                                    </h2>


                                    <div className="flex items-center space-x-4 rounded-lg">
                                        <Avatar className="w-[60px] h-[60px] bg-blue-500 rounded-full flex items-center justify-center text-muted-foreground text-2xl">
                                            <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                                        </Avatar>
                                        <div>
                                            <p>Nom</p>
                                            <Input
                                                value={user?.name}
                                                onChange={() => { }}
                                                className="h-7 px-2 border border-neutral-400 dark:border-[#3c3c3c] bg-neutral-300 dark:bg-[#2c2c2c] focus-visible:ring-0 focus-visible:ring-offset-0 focus-within:shadow-[inset_0_0_0_1px_#2383e291,0_0_0_2px_#2383e259]"
                                                placeholder="..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <InputMailModal onConfirm={onEmailChange} title="Changer d'adresse e-mail" description="Entrez votre nouvelle adresse e-mail" placeholder={user?.email}>
                                            <button className="flex items-center justify-between w-full p-3 border rounded-lg ">
                                                <div className="flex items-center justify-center">
                                                    <Mail className="mr-3" size={20} />
                                                    <div className='flex flex-col items-start'>
                                                        <span>Email</span>
                                                        <p className='text-xs text-muted-foreground'>{user?.email}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-center border h-[32px] w-auto px-3 border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg'>
                                                    <span className=''>Changer d'adresse e-mail</span>
                                                </div>
                                            </button>
                                        </InputMailModal>

                                        <InputPasswordModal onConfirm={onPasswordChange} title="Changer le mot de passe" description="Entrez votre nouveau mot de passe">
                                            <button className="flex items-center justify-between w-full p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700">
                                                <div className="flex items-center">
                                                    <Lock className="mr-3" size={20} />
                                                    <span>Changer le mot de passe</span>
                                                </div>
                                                <ChevronRight size={20} />
                                            </button>
                                        </InputPasswordModal>

                                        <Separator />

                                        <div className="flex items-center p-3 pt-4 border-t rounded-lg justify-evenly">
                                            <button className="flex items-center text-red-500 hover:text-red-600">
                                                <Trash2 className="mr-2" size={20} />
                                                Supprimer mon compte
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="px-16 space-y-6 py-9">
                                    <h2 className="font-sans text-base">
                                        Mes paramètres
                                        <Separator className='mt-4 bg-gray-200 dark:bg-neutral-700' />
                                    </h2>

                                    <div className="flex items-center justify-between pr-8 space-y-5 border">
                                        <div className="p-4 rounded-lg">
                                            <h3 className="mb-3 font-semibold">Apparence</h3>
                                            <span className="text-xs text-muted-foreground">
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