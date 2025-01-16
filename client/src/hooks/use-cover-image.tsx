import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type CoverImageStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReplace: (url: string) => void;
}

const CoverImageContext = createContext<CoverImageStore | undefined>(undefined);

export const CoverImageProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onReplace = useCallback((url: string) => {setIsOpen(true)}, []);

    return (
        <CoverImageContext.Provider value={{ isOpen, onOpen, onClose, onReplace}}>
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