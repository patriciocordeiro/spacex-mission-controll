'use client';
import React from 'react';

type LaunchHeroProps = {
  pageTitle: string;
  pageDescription: string;
  rightContent?: React.ReactNode;
};

const PageHero: React.FC<LaunchHeroProps> = ({
  pageTitle,
  pageDescription,
  rightContent,
}) => {
  return (
    <div className='w-full bg-white dark:bg-black flex justify-center items-center pt-[56px]'>
      <div className='container mx-auto flex justify-between items-center min-h-[348px]'>
        <div className='flex flex-1 flex-wrap lg:flex-nowrap justify-between items-end'>
          <div className='flex flex-col justify-center w-[327px] lg:w-[512px] gap-4 h-[204px] pt-12 px-6 lg:pt-0 lg:px-0 w-full lg:w-[512px]'>
            <h1 className='text-[44px]/[48px] lg:text-[68px]/[72px] font-bold'>
              {pageTitle}
            </h1>
            <p className='text-gray-500 dark:text-gray-400 text-sm/[18px] lg:text-lg'>
              {pageDescription}
            </p>
          </div>
          <div className='mt-8 flex gap-4 lg:gap-6 items-center h-[164px] lg:h-auto py-10 px-6 lg:py-0 lg:px-0 w-full lg:w-auto'>
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
