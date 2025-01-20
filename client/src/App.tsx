import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentsPage from './pages/main/(document)/page';
import PreviewPage from './pages/main/(preview)/page';
import './index.css';

import { AuthProvider } from './components/context/useAuth';
import { MarketingPage } from './pages/home/page';
import { DocumentProvider } from './components/context/useDocuments';
import { AnimationProvider } from './components/context/useAnimation';
import { ThemeProvider } from './components/context/useTheme';
import { CoverImageProvider } from "@/hooks/use-cover-image";
import { BoardingProvider } from './hooks/use-boarding';
import { ImageProvider } from "@/components/context/useImage";


import { Toaster } from 'sonner';
import NotPublishPage from './pages/NotPublish';
import Form404 from './pages/404';


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DocumentProvider>
          <AnimationProvider>
            <BoardingProvider>
              <CoverImageProvider>
                <ImageProvider>
                  <Toaster />
                  <Routes>
                    <Route path="/" element={<MarketingPage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                    <Route path="/documents/:documentId" element={<DocumentsPage />} />
                    <Route path="/preview/:documentId" element={<PreviewPage />} />
                    <Route path="*" element={<Form404 />} />
                    <Route path="/not-publish" element={<NotPublishPage />} />
                  </Routes>
                </ImageProvider>
              </CoverImageProvider>
            </BoardingProvider>
          </AnimationProvider>
        </DocumentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;