import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MarketingPage from './pages/home/page';
import DocumentsPage from './pages/main/page';
import './index.css';

import { AuthProvider } from './components/context/useAuth';
import { DocumentProvider } from './components/context/useDocuments';
import { Toaster } from 'sonner';
import { AnimationProvider } from './components/context/useAnimation';
import { ThemeProvider } from './components/context/useTheme';


const queryClient = new QueryClient();



const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DocumentProvider>
          <AnimationProvider>
              <QueryClientProvider client={queryClient}>
                <Toaster />
                <Routes>
                  <Route path="/" element={<MarketingPage />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/documents/:documentId" element={<DocumentsPage />} />
                </Routes>
              </QueryClientProvider>
          </AnimationProvider>
        </DocumentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;