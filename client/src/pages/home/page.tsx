import React from 'react';
import { Heading } from './components/Heading';
import { Preview } from './components/Preview';
import { Footer } from './components/Footer';
import Layout from './layout';


export const MarketingPage: React.FC = () => {
  return (
    <Layout>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-12 px-6 gap-12">
            <Heading />
            <Preview />
          </div>
          <Footer />
        </div>
    </Layout>
  );
};