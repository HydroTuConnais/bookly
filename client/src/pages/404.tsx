import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowBigRight, ArrowRight, ArrowRightIcon } from 'lucide-react';

const Form404: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirectHomePage = () => {
        navigate("/documents");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-gray-100">
            {/* Section gauche */}
            <div className="w-1/2 flex flex-col items-center justify-center text-center px-8">
                <h1 className="text-5xl font-extrabold mb-6">Page not found</h1>
                <p className="text-2xl mb-8">Either this page doesn&apos;t exist or you don&apos;t have permission <br></br> to view it.</p>
                <Button variant="ghost" onClick={handleRedirectHomePage} className="px-6 py-6 dark:bg-white bg-neutral-900 border shadow-lg dark:text-black text-white font-semibold text-lg ">
                    Go back to Home <ArrowRight className="!w-6 !h-6 rounded" />
                </Button>
            </div>

            {/* Section droite */}
            <div className="w-1/2 h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                <img
                    src="/error.png"
                    alt="Not Found Illustration"
                    className="w-1/2 object-contain rounded-lg dark:hidden"
                />
                <img
                    src="/error-dark.png"
                    alt="Not Found Illustration"
                    className="w-1/2 object-contain rounded-lg hidden dark:block"
                />
            </div>
        </div>
    );
};

export default Form404;
