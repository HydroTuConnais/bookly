import React from 'react';
import { Heading } from './components/Heading';
import { Figure } from './components/Figure';
import { Footer } from './components/Footer';
import Layout from './layout';

const MarketingPage: React.FC = () => {
  return (
    <Layout>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            <Figure />
          </div>
          <Footer />
        </div>
    </Layout>
  );
}

export default MarketingPage;