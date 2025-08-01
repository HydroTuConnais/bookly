import { Check } from 'lucide-react';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { RecoveryService } from '@/services/recoveryService';

export const ConfirmRecoveryPageEmail: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id, token } = params;

    if (!id || !token) {
        navigate("/404");
    }

    const { data, isLoading, isError } = useQuery(
        ['recoveryEmail', id, token],
        () => {
            if (id && token) {
                return RecoveryService.recoveryEmail({ id, token });
            }
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        // console.log("ConfirmRecoveryPageEmail");
        if (data) {
            //console.log(data);
        } else if (!isLoading && !isError) {
            navigate("/not-changed/email");
        }
    }, [data, isLoading, isError, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-neutral-900">
            <div className="bg-white dark:bg-[#1F1F1F] shadow-lg rounded-lg p-6 md:p-8 max-w-md text-center animate-fade-in-once">
                <div className="flex items-center justify-center mb-4">
                    <div className="p-2 rounded-full bg-green-50">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <h1 className="mb-2 text-2xl font-semibold text-muted-foreground">
                    Votre email a été modifié avec succès !
                </h1>
                <p className="mb-4 text-muted-foreground">
                    Vous pouvez désormais utiliser votre nouvel email pour vous connecter ou recevoir nos notifications.
                </p>
                <button
                    className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => navigate("/")}
                >
                    Retour à l’accueil
                </button>
            </div>
        </div>
    );
};
