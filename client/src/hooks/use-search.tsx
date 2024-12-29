import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type SearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
};

const SearchContext = createContext<SearchStore | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log("use-search");
        console.log(isOpen);
    }, [isOpen]);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    return (
        <SearchContext.Provider value={{ isOpen, onOpen, onClose, toggle }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchStore => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};