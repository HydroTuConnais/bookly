import React, { useState, useEffect, useMemo } from "react";
import { useAuth, UserProfile } from "../context/useAuth";
import { useQuery, useQueryClient } from "react-query";
import { useDocuments, Document } from "../context/useDocuments";
import { useAdminEditDocument } from "@/hooks/use-document-admin";

import { DocumentPageId } from "../../pages/main/(document)/[documents]/page";

export const AdminEditDocumentModal = () => {
    const [isMounted, setIsMounted] = useState(false);

    const { getAllUsers, updateUser } = useAuth();
    const { isOpen, onClose, documentId } = useAdminEditDocument();
    const { getAllDocuments, updateDocument } = useDocuments();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-[99999] inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm "
                    onClick={handleOverlayClick}>
                    <div className="relative w-[1500px] h-[1600px] max-h-[90vh] bg-white shadow-xl rounded-2xl dark:bg-neutral-800  flex flex-col">
                        {documentId && (
                            <DocumentPageId documentId={documentId} />
                        )}

                    </div>
                </div>
            )}
        </>
    )
}
