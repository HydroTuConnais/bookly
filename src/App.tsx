import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketingPage from './pages/home/page';
import './index.css';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/home" element={<MarketingPage />} />
        </Routes>
      </Router>
  );
}

export default App;