import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentsPage from './pages/documents/page';
import './index.css';

import { AuthProvider } from './components/context/useAuth';
import { MarketingPage } from './pages/home/page';
import { DocumentProvider } from './components/context/useDocuments';
import { AnimationProvider } from './components/context/useAnimation';
import { ThemeProvider } from './components/context/useTheme';
import { CoverImageProvider } from "@/hooks/use-cover-image";
import { ImageProvider } from "@/components/context/useImage";

import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from 'sonner';



const App: React.FC = () => {
  return (
      <ThemeProvider>
        <AuthProvider>
          <DocumentProvider>
            <AnimationProvider>
              <CoverImageProvider>
                <ImageProvider>
                  <Toaster />
                  <Routes>
                    <Route path="/" element={<MarketingPage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                    <Route path="/documents/:documentId" element={<DocumentsPage />} />
                    <Route path="/preview/:documentId" element={<DocumentsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </ImageProvider>
              </CoverImageProvider>
            </AnimationProvider>
          </DocumentProvider>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;