import { useAuth } from "@/components/context/useAuth";
import { useDocuments,  Document} from "@/components/context/useDocuments";
import { usePromise } from "@/hooks/usePromise";
import { MenuIcon } from "lucide-react";
import React, { useEffect } from "react"
import { Navigate, useParams } from "react-router-dom";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
    documentId: string;
}

export const Navbar = ( {
    isCollapsed,
    onResetWidth,
    documentId
}: NavbarProps) => {
    const { getDocument, restoreDocument, deleteDocument} = useDocuments();

    const { data: documents, loading, error } = usePromise<Document | null>(() => getDocument({ id: documentId }), [documentId, restoreDocument, deleteDocument]);

    useEffect(() => {
        if (documents) {
            console.log("NAVBAR")
            console.log(documents.title);
        }
    }, [documents]);

    if (loading) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between gap-x-4 animate-pulse">
                <div className="h-6 w-[200px] rounded bg-gray-200 dark:bg-neutral-700"></div>
                <div className="flex items-center gap-x-2">
                    <div className="h-8 w-10 rounded bg-gray-200 dark:bg-neutral-700"></div>
                </div>
            </nav>
        );
    }

    if(documents === undefined || documents === null) {
        return <Navigate to="/404" />;
    }

    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon 
                    role="button"
                    onClick={onResetWidth}
                    className="h-6 w-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={documents}/>
                    <div className="flex items-center gap-x-2">
                        <Menu documentId={documents.id} />
                    </div>
                </div>
            </nav>
            {documents?.isArchived && (
                <Banner documentId={documents.id} />
            )}
        </>
    )
}