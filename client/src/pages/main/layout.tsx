import React from "react";
import { AuthProvider, useAuth } from '@/context/useAuth';
import { DocumentProvider, useDocuments } from '@/context/useDocuments';
import { Navigate } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { AnimationProvider, useAnimation } from "@/context/useAnimation";
import { Preloader } from "./components/preloader";

import "./style/home.css";



const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const { loading } = useDocuments();

    if (isLoading || loading) {
        return (
            <div>
            </div>
        );
    }
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <div className="fade-in-right h-screen">
                <Navigation />
            </div>
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

const LayoutWithProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAnimationFinished } = useAnimation();

    return (
        <AuthProvider>
            {!isAnimationFinished
                ?
                <div className="h-screen flex flex-col items-center justify-center space-y-4">
                    <Preloader />
                    <span className="apple-loader" />
                </div>
                :
                <div>
                    <span className="apple-loader" />
                    <Layout>{children}</Layout>
                </div>
            }
        </AuthProvider>
    );
};

export default LayoutWithProvider;