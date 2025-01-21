import { Check } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ConfirmRecoveryPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900">
            <div className="bg-white dark:bg-[#1F1F1F] shadow-lg rounded-lg p-6 md:p-8 max-w-md text-center animate-fade-in-once">
                <div className="flex items-center justify-center mb-4">
                    <div className="p-2 bg-green-50 rounded-full">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-muted-foreground mb-2">
                    Votre email a été modifié avec succès !
                </h1>
                <p className="text-muted-foreground mb-4">
                    Vous pouvez désormais utiliser votre nouvel email pour vous connecter ou recevoir nos notifications.
                </p>
                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => navigate("/")}
                >
                    Retour à l’accueil
                </button>
            </div>
        </div>
    );
};
