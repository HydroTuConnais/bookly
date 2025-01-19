import React from 'react';
import { Heading } from './components/Heading';
import { Preview } from './components/Preview';
import { Footer } from './components/Footer';
import Layout from './layout';


export const MarketingPage: React.FC = () => {
  return (
    <Layout>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center md:justify-start text-center">            
            <Preview />
          </div>
          <Footer />
        </div>
    </Layout>
  );
};