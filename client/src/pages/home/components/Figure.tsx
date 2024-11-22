import React from 'react';

export const Figure: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <img
            src="/documents.png"
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <img
            src="/documents-black.png"
            className="object-contain relative h-[400px] w-[400px] hidden dark:block"
            alt="Documents"
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <img
            src="/documents2.png"
            className="object-contain dark:hidden"
            alt="Documents2"
          />
          <img
            src="/documents2-black.png"
            className="object-contain relative h-[400px] w-[400px] hidden dark:block"
            alt="Documents2"
          />
        </div>
      </div>
    </div>
  );
};