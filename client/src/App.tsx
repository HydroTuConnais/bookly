import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketingPage from './pages/home/page';
import DocumentsPage from './pages/main/routes/dashboard/page';
import './index.css';

import { AuthProvider } from './context/useAuth';
import { DocumentProvider } from './context/useDocuments';
import { Toaster } from 'sonner';
import { AnimationProvider } from './context/useAnimation';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DocumentProvider>
        <AnimationProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Routes>
        </AnimationProvider>
      </DocumentProvider>
    </AuthProvider>
  );
}

export default App;