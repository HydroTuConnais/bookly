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
    Trash2,
    AlertCircle
} from 'lucide-react';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useAuth } from '../context/useAuth';
import { useSettings } from '@/hooks/use-options';
import { InputMailModal } from './mail-change-modal';
import { ModeToggle } from "@/components/mode-toggle";
import { InputPasswordModal } from './password-change-modal';
import { cn } from '@/lib/utils';

export const SettingsModal = () => {
    const { isOpen, onClose } = useSettings();
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { user, sendRecovryEmail, sendRecovryPassword, updateUser } = useAuth();

    const [userName, setUserName] = useState(user?.name || '');
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsMounted(true);
        console.log("SettingsModal mounted");
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

    const handleDeleteAccount = () => {
        setShowDeleteConfirm(true);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            handleUpdateUser({ userName: e.target.value });
        }, 250);
        setTimeoutId(newTimeoutId);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setUserName(e.currentTarget.value);
        }
    };

    const handleUpdateUser = async ({ userName }: { userName: string }) => {
        await updateUser({ name: userName });
    };

    return (
        <>
            {isOpen && (
                <div
                    className="z-[99991] fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm transition-all duration-300"
                    onClick={handleOverlayClick}
                >
                    <div className="flex bg-[#fbfbfa] dark:bg-neutral-800 rounded-l-2xl h-[600px] overflow-hidden shadow-xl">
                        {/* Sidebar */}
                        <div className="px-[4px] pt-[10px] w-64 border-r border-gray-200 dark:border-neutral-700">
                            <div className="space-y-1">
                                <h1 className='px-3 mb-4 text-sm font-semibold text-muted-foreground'>Paramètres</h1>

                                <div className="flex items-center w-full p-3 mb-4 space-x-4 rounded-md bg-gray-50 dark:bg-neutral-700/50">
                                    <Avatar className="flex justify-center items-center rounded-full w-[32px] h-[32px] ring-2 ring-blue-200 dark:ring-blue-500/20">
                                        <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user?.name}</p>
                                        <p className='text-xs select-none text-muted-foreground'>{user?.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={cn(
                                        'flex px-3 items-center w-full p-2 rounded-md transition-colors duration-200',
                                        activeTab === 'account'
                                            ? 'bg-gray-100 dark:bg-neutral-700 text-blue-600 dark:text-blue-400'
                                            : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
                                    )}
                                >
                                    <User size={18} className="mr-2" />
                                    <p className={cn('text-sm font-sans',
                                        activeTab === 'account' && 'font-semibold'
                                    )}>Mon compte</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={cn(
                                        'flex px-3 items-center w-full p-2 rounded-md transition-colors duration-200',
                                        activeTab === 'preferences'
                                            ? 'bg-gray-100 dark:bg-neutral-700 text-blue-600 dark:text-blue-400'
                                            : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
                                    )}
                                >
                                    <Settings size={18} className="mr-2" />
                                    <p className={cn('text-sm font-sans',
                                        activeTab === 'preferences' && 'font-semibold'
                                    )}>Mes paramètres</p>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex bg-white dark:bg-[#202020] rounded-r-2xl w-[900px] h-[600px] overflow-hidden">
                            <div className="flex-1 overflow-y-auto">
                                {activeTab === 'account' && (
                                    <div className="px-16 space-y-6 py-9">
                                        <h2 className="font-sans text-xl font-semibold">
                                            Mon compte
                                            <Separator className='mt-4 bg-gray-200 dark:bg-neutral-700' />
                                        </h2>

                                        <div className="flex items-center p-4 space-x-4 rounded-lg bg-gray-50 dark:bg-neutral-900/50">
                                            <Avatar className="flex justify-center items-center rounded-full w-[60px] h-[60px] text-2xl text-muted-foreground ring-4 ring-blue-200 dark:ring-blue-500/20">
                                                <AvatarImage src={user?.imageUrl || "/avatar-default.png"} alt="Avatar" />
                                            </Avatar>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                                                <Input
                                                    value={userName}
                                                    onChange={onChange}
                                                    onKeyDown={onKeyDown}
                                                    className="border-neutral-400 dark:border-[#3c3c3c] bg-white dark:bg-[#2c2c2c] focus-within:shadow-[0_0_0_2px_#2383e259] px-3 border focus-visible:ring-0 focus-visible:ring-offset-0 h-9 w-[300px]"
                                                    placeholder="Votre nom"
                                                />
                                            </div>
                                        </div>

                                        <h2 className="!mt-10 font-sans text-xl font-semibold">
                                            Sécurité du compte
                                            <Separator className='mt-4 bg-gray-200 dark:bg-neutral-700' />
                                        </h2>

                                        <div className="space-y-4">
                                            <InputMailModal onConfirm={onEmailChange} title="Changer d'adresse e-mail" description="Entrez votre nouvelle adresse e-mail" placeholder={user?.email}>
                                                <button className="flex items-center justify-between w-full p-4 transition-colors duration-200 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900/50">
                                                    <div className="flex items-center justify-center">
                                                        <Mail className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
                                                        <div className='flex flex-col items-start'>
                                                            <span className="font-medium">Email</span>
                                                            <p className='text-sm text-muted-foreground'>{user?.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center justify-center px-4 py-2 transition-colors duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10'>
                                                        <span className='font-medium text-blue-600 dark:text-blue-400'>Modifier</span>
                                                    </div>
                                                </button>
                                            </InputMailModal>

                                            <InputPasswordModal onConfirm={onPasswordChange} title="Changer le mot de passe" description="Entrez votre nouveau mot de passe">
                                                <button className="flex items-center justify-between w-full p-4 transition-colors duration-200 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900/50">
                                                    <div className="flex items-center">
                                                        <Lock className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
                                                        <span className="font-medium">Changer le mot de passe</span>
                                                    </div>
                                                    <ChevronRight className="text-gray-400" size={20} />
                                                </button>
                                            </InputPasswordModal>

                                            <Separator className="my-6" />

                                            {showDeleteConfirm ? (
                                                <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-500/10 dark:border-red-500/20">
                                                    <div className="flex items-center mb-4">
                                                        <AlertCircle className="mr-2 text-red-500" size={20} />
                                                        <h3 className="font-semibold text-red-600 dark:text-red-400">Confirmer la suppression</h3>
                                                    </div>
                                                    <p className="mb-4 text-sm text-red-600 dark:text-red-400">
                                                        Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                                                    </p>
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => setShowDeleteConfirm(false)}
                                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            Annuler
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            Confirmer la suppression
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={handleDeleteAccount}
                                                    className="flex items-center w-full px-4 py-3 text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="mr-2" size={20} />
                                                    Supprimer mon compte
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'preferences' && (
                                    <div className="px-16 space-y-6 py-9">
                                        <h2 className="font-sans text-xl font-semibold">
                                            Mes paramètres
                                            <Separator className='mt-4 bg-gray-200 dark:bg-neutral-700' />
                                        </h2>

                                        <div className="flex items-center justify-between p-6 border rounded-lg bg-gray-50 dark:bg-neutral-900/50">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold">Apparence</h3>
                                                <span className="text-sm text-muted-foreground">
                                                    Personnalisez l'apparence de votre interface
                                                </span>
                                            </div>
                                            <ModeToggle />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}