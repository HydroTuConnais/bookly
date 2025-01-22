import React from 'react';
import { useParams } from 'react-router-dom';

const NotChange: React.FC = () => {
    const params = useParams();
    const { prefix } = params;

    return (
        <div
            className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-gray-100">
            {/* Section gauche */}
            <div className="flex flex-col items-center justify-center w-1/2 px-8 text-center">
                <h1 className="mb-6 text-5xl font-extrabold">Quelque chose n'a pas fonctionnée</h1>
                {prefix === "email" ? (
                    <p className="mb-8 text-2xl">Le changement d'email n'a pas pu aboutir. <br></br> Veuillez réessayer plus tard.</p>
                ) : prefix === "password" ? (
                    <p className="mb-8 text-2xl">Le changement de mots de passe n'a pas pu aboutir. <br></br> Veuillez réessayer plus tard.</p>
                ) : (
                    <p className="mb-8 text-2xl">Une erreur inconnue est survenue. <br></br> Veuillez réessayer plus tard.</p>
                )}
            </div>

            {/* Section droite */}
            <div className="flex items-center justify-center w-1/2 h-full bg-neutral-100 dark:bg-neutral-800">
                <img src="/error.png" alt="Not Found Illustration" className="object-contain w-1/2 rounded-lg dark:hidden" />
                <img src="/error-dark.png" alt="Not Found Illustration"
                    className="hidden object-contain w-1/2 rounded-lg dark:block" />
            </div>
        </div>
    );
};

export default NotChange;