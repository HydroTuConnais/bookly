import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type CoverImageStore = {
    isOpen: boolean;
    onOpen: (documentId: string) => void;
    onClose: () => void;
    onReplace: (url: string) => void;
    documentId: string | null;
}

const CoverImageContext = createContext<CoverImageStore | undefined>(undefined);

export const CoverImageProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [documentId, setDocumentId] = useState<string | null>(null);

    const onOpen = useCallback((documentId: string) => { setIsOpen(true); setDocumentId(documentId) }, []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onReplace = useCallback((url: string) => { setIsOpen(true) }, []);

    return (
        <CoverImageContext.Provider value={{ isOpen, onOpen, onClose, onReplace, documentId }}>
            {children}
        </CoverImageContext.Provider>
    );
};

export const useCoverImage = (): CoverImageStore => {
    const context = useContext(CoverImageContext);
    if (!context) {
        throw new Error('useCoverImage must be used within a CoverImageProvider');
    }
    return context;
};