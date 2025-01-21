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

interface Device {
    name: string;
    lastConnection: string;
    type: 'mobile' | 'desktop';
}

export const SettingsModal = () => {
    const { isOpen, onClose } = useSettings();
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [theme, setTheme] = useState('system');
    const [startupPage, setStartupPage] = useState('last');
    const [language, setLanguage] = useState('fr');

    const { user, sendRecovryEmail } = useAuth();

    const mockDevices: Device[] = [
        { name: 'MacBook Pro', lastConnection: '2024-03-14 10:30', type: 'desktop' },
        { name: 'iPhone 13', lastConnection: '2024-03-14 09:15', type: 'mobile' }
    ];

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

                                <div className="flex px-3 items-center w-full p-1 rounded-md space-x-4">
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
                                <button
                                    onClick={() => setActiveTab('language')}
                                    className={`flex px-3 items-center w-full p-1 rounded-md ${activeTab === 'language' ? 'bg-gray-100 dark:bg-neutral-700' : 'hover:bg-gray-50 dark:hover:bg-neutral-700'
                                        }`}
                                >
                                    <Languages size={18} className="mr-2" />
                                    Langue
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#202020] w-[900px] h-[600px] rounded-r-2xl flex overflow-hidden">
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeTab === 'account' && (
                                <div className="space-y-6 px-16 py-9">
                                    <h2 className="text-base font-sans">
                                        Mon compte
                                        <Separator className='mt-4 bg-gray-200 dark:bg-neutral-700' />
                                    </h2>


                                    <div className="flex items-center space-x-4  rounded-lg">
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


                                        <button className="flex items-center justify-between w-full p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700">
                                            <div className="flex items-center">
                                                <Lock className="mr-3" size={20} />
                                                <span>Changer le mot de passe</span>
                                            </div>
                                            <ChevronRight size={20} />
                                        </button>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold mb-3">Appareils connectés</h3>
                                            <div className="space-y-3">
                                                {mockDevices.map((device, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                        <div className="flex items-center">
                                                            {device.type === 'desktop' ? <Laptop size={20} /> : <Smartphone size={20} />}
                                                            <div className="ml-3">
                                                                <p className="font-medium">{device.name}</p>
                                                                <p className="text-sm text-gray-500">Dernière connexion: {device.lastConnection}</p>
                                                            </div>
                                                        </div>
                                                        <button className="text-red-500 hover:text-red-600">
                                                            <LogOut size={20} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <button className="flex items-center text-red-500 hover:text-red-600">
                                                <Trash2 className="mr-2" size={20} />
                                                Supprimer mon compte
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Mes paramètres</h2>

                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4">
                                            <h3 className="font-semibold mb-3">Apparence</h3>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => setTheme('light')}
                                                    className={`flex-1 p-3 border rounded-lg ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <Sun className="mx-auto mb-2" />
                                                    Clair
                                                </button>
                                                <button
                                                    onClick={() => setTheme('dark')}
                                                    className={`flex-1 p-3 border rounded-lg ${theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <Moon className="mx-auto mb-2" />
                                                    Sombre
                                                </button>
                                                <button
                                                    onClick={() => setTheme('system')}
                                                    className={`flex-1 p-3 border rounded-lg ${theme === 'system' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <Laptop className="mx-auto mb-2" />
                                                    Système
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h3 className="font-semibold mb-3">Page de démarrage</h3>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="startup"
                                                        checked={startupPage === 'home'}
                                                        onChange={() => setStartupPage('home')}
                                                        className="mr-2"
                                                    />
                                                    Page d'accueil
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="startup"
                                                        checked={startupPage === 'last'}
                                                        onChange={() => setStartupPage('last')}
                                                        className="mr-2"
                                                    />
                                                    Dernière page visitée
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'language' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Langue</h2>

                                    <div className="space-y-2">
                                        {[
                                            { code: 'fr', name: 'Français' },
                                            { code: 'en', name: 'English' },
                                            { code: 'es', name: 'Español' },
                                            { code: 'de', name: 'Deutsch' }
                                        ].map((lang) => (
                                            <label key={lang.code} className="flex items-center p-3 border rounded-lg">
                                                <input
                                                    type="radio"
                                                    name="language"
                                                    checked={language === lang.code}
                                                    onChange={() => setLanguage(lang.code)}
                                                    className="mr-3"
                                                />
                                                {lang.name}
                                            </label>
                                        ))}
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