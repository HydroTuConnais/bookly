import React from "react";
import { useAuth } from '@/components/context/useAuth';

import { Navigate } from "react-router-dom";
import "../style/home.css";

const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { checkAuth, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div>
            </div>
        );
    }

    if (!checkAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="h-screen flex dark:bg-[#1F1F1F]">
            <main className="flex-1 h-full overflow-y-auto editor-container">
                {children}
            </main>
        </div>
    );
};

const LayoutWithProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <Layout>{children}</Layout>
    );
};

export default LayoutWithProvider;