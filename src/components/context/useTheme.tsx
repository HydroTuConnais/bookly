import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  resolvedTheme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resolvedTheme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('bookly-theme-2');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    console.log('resolvedTheme', resolvedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
    localStorage.setItem('bookly-theme-2', resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (resolvedTheme === 'dark') {
      favicon.href = '/favicon-dark.ico';
    } else {
      favicon.href = '/favicon.ico';
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!ThemeContext) {
    throw new Error('ThemeContext value is null. Please ensure you are using the ThemeProvider.');
  }

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};