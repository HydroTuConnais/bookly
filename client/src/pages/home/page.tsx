import React from 'react';
import { Heading } from './components/Heading';
import { Preview } from './components/Preview';
import { Footer } from './components/Footer';
import { useAuth } from '@/components/context/useAuth';
import Layout from './layout';
import { useNavigate } from 'react-router-dom';


export const MarketingPage: React.FC = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await checkAuth();
        if (response) {
          navigate("/documents");
        }
      }
    };
    checkAuthentication();
  }, []);



  return (
    <Layout>
      <div className="flex flex-col min-h-full">
        <div className="flex flex-col items-center justify-center text-center md:justify-start">
          <Preview />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};