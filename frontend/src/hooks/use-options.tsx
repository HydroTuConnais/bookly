import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type SettingsStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const SettingsContext = createContext<SettingsStore | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <SettingsContext.Provider value={{ isOpen, onOpen, onClose }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsStore => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};