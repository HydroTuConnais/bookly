import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type BoardingStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const BoardingContext = createContext<BoardingStore | undefined>(undefined);

export const BoardingProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <BoardingContext.Provider value={{ isOpen, onOpen, onClose }}>
            {children}
        </BoardingContext.Provider>
    );
};

export const useBoarding = (): BoardingStore => {
    const context = useContext(BoardingContext);
    if (!context) {
        throw new Error('useBoarding must be used within a BoardingProvider');
    }
    return context;
};