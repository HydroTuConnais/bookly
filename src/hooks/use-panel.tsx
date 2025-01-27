import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type PanelStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
};

const PanelContext = createContext<PanelStore | undefined>(undefined);

export const PanelProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        //console.log(isOpen);
    }, [isOpen]);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    return (
        <PanelContext.Provider value={{ isOpen, onOpen, onClose, toggle }}>
            {children}
        </PanelContext.Provider>
    );
};

export const usePanel = (): PanelStore => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error('usePanel must be used within a PanelProvider');
    }
    return context;
};