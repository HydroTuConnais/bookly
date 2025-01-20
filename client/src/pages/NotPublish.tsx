import React from 'react';

const NotPublishPage: React.FC = () => {

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-gray-100">
            {/* Section gauche */}
            <div className="w-1/2 flex flex-col items-center justify-center text-center px-8">
                <h1 className="text-5xl font-extrabold mb-6">Page not publish</h1>
                <p className="text-2xl mb-8">Either this page doesn&apos;t exist or you don&apos;t have permission <br></br> to view it.</p>
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

export default NotPublishPage;
