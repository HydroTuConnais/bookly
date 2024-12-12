import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketingPage from './pages/home/page';
import DocumentsPage from './pages/main/routes/dashboard/page';
import './index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketingPage />} />
      <Route path="/dashboard" element={<DocumentsPage />} />
  </Routes>
  );
}

export default App;