import React from "react";
import { useAuth } from '@/components/context/useAuth';

import { Navigate } from "react-router-dom";
import { Navigation } from "../components/navigation";

import "../style/home.css";
import { SearchCommand } from "@/components/search-command";
import { SearchProvider } from "@/hooks/use-search";
import { SettingsProvider } from "@/hooks/use-options";
import { SettingsModal } from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { BoardingProvider } from "@/hooks/use-boarding";
import { BoardingModal } from "@/components/modals/boarding-modal";

const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <div>
            </div>
        );
    }

    return (
        <div className="h-screen flex dark:bg-[#1F1F1F]">
            <div className="fade-in-right h-screen">
                <Navigation />
            </div>
            <main className="flex-1 h-full overflow-y-auto editor-container">
                <SearchCommand />
                <SettingsModal />
                <CoverImageModal />
                <BoardingModal />
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