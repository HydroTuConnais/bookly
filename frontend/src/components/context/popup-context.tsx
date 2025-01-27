import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
  isOpen: boolean;
  popupType: string | null;
  openPopup: (type: string) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupType, setPopupType] = useState<string | null>(null);

  const openPopup = (type: string) => {
    setPopupType(type);
    setIsOpen(true);
  };

  const closePopup = () => {
    setPopupType(null);
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ isOpen, popupType, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};