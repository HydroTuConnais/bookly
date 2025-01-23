import React from "react";
import { useAuth } from '@/components/context/useAuth';

import { Navigation } from "../components/navigation";

import "../style/home.css";
import { SearchCommand } from "@/components/search-command";
import { SearchProvider } from "@/hooks/use-search";
import { SettingsProvider } from "@/hooks/use-options";
import { SettingsModal } from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { BoardingModal } from "@/components/modals/boarding-modal";
import { PanelProvider } from "@/hooks/use-panel";
import { AdminPanelModal } from "@/components/modals/panel-admin";

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
            <div className="h-screen fade-in-right">
                <Navigation />
            </div>
            <main className="flex-1 h-full overflow-y-auto editor-container">
                <AdminPanelModal />
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
        <PanelProvider>
            <SearchProvider>
                <SettingsProvider>
                    <Layout>{children}</Layout>
                </SettingsProvider>
            </SearchProvider>
        </PanelProvider>
    );
};

export default LayoutWithProvider;