import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type AdminEditDocumentStore = {
    isOpen: boolean;
    onOpen: (documentId: string) => void;
    onClose: () => void;
    documentId: string | null;
};

const AdminEditDocumentContext = createContext<AdminEditDocumentStore | undefined>(undefined);

export const AdminEditDocumentProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [documentId, setDocumentId] = useState<string | null>(null);

    const onOpen = useCallback((documentId: string) => { setIsOpen(true); setDocumentId(documentId); }, []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <AdminEditDocumentContext.Provider value={{ isOpen, onOpen, onClose, documentId }}>
            {children}
        </AdminEditDocumentContext.Provider>
    );
};

export const useAdminEditDocument = (): AdminEditDocumentStore => {
    const context = useContext(AdminEditDocumentContext);
    if (!context) {
        throw new Error('useAdminEditDocument must be used within a AdminEditDocumentProvider');
    }
    return context;
};