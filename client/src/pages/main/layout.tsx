import React from "react";
import { useAuth } from '@/components/context/useAuth';
import { useDocuments } from '@/components/context/useDocuments';
import { Navigate } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { useAnimation } from "@/components/context/useAnimation";
import { Preloader } from "./components/preloader";

import "./style/home.css";
import { SearchCommand } from "@/components/search-command";
import { SearchProvider } from "@/hooks/use-search";
import { SettingsProvider } from "@/hooks/use-options";
import { SettingsModal } from "@/components/modals/settings-modal";



const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { checkAuth, isLoading } = useAuth();
    const { loading } = useDocuments();

    if (isLoading || loading) {
        return (
            <div>
            </div>
        );
    }
    
    if (!checkAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <div className="fade-in-right h-screen">
                <Navigation />
            </div>
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                <SettingsModal />
                {children}
            </main>
        </div>
    );
};

const LayoutWithProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SearchProvider>
            <SettingsProvider>
                <Layout>{children}</Layout>
            </SettingsProvider>
        </SearchProvider>
    );
};

export default LayoutWithProvider;