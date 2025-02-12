'use client';

import StoreContext from '@/app/context/StoreContext';
import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useEffect, useRef } from 'react';

import EmptyContentMessage from '@/app/components/EmptyContentMessage';
import PageHero from '@/app/components/PageHero';
import { LoadingSpinner } from '@/app/components/Spinner';
import { ProcessStatus } from '@/app/enums/spacex.enum';
import LaunchList from '../../components/LaunchList';
import LaunchSearchToolbar from './LaunchSearchToolbar';

function LaunchesPage() {
  const { launchStore } = useContext(StoreContext);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const pageTitle = 'Making life Multiplanetary';
  const pageDescription =
    'To revolutionize space technology, with the ultimate goal of enabling people to live on other planets.';
  const emptyContentMessage = {
    title: 'Lost in space?',
    description: 'Try searching with different terms.',
  };

  const renderLaunchCount = () => (
    <div className='mt-8 flex gap-4 lg:gap-6 items-center h-[164px] lg:h-auto py-10 px-6 lg:py-0 lg:px-0 w-full lg:w-auto'>
      <div className='border-l border-blue-500 pl-6'>
        <h1 className='text-blue-500 text-[84px] font-bold leading-none'>
          {launchStore.spaceXData?.totalDocs}
        </h1>
      </div>
      <span className='uppercase text-xs font-normal'>Total Launches</span>
    </div>
  );

  const renderContent = () => {
    if (launchStore.status === ProcessStatus.ERROR) {
      return (
        <div role='alert' aria-live='assertive'>
          Error: {launchStore.error}
        </div>
      );
    }

    if (
      launchStore.status === ProcessStatus.SUCCESS &&
      launchStore.itemList.length === 0
    ) {
      return (
        <EmptyContentMessage
          title={emptyContentMessage.title}
          description={emptyContentMessage.description}
        />
      );
    }

    return (
      <>
        <LaunchList launchList={launchStore.itemList} />
        {launchStore.status === ProcessStatus.LOADING && (
          <div className='flex justify-center py-4'>
            <LoadingSpinner />
          </div>
        )}
      </>
    );
  };

  const loadMoreLaunches = useCallback(() => {
    if (
      launchStore.spaceXData?.hasNextPage &&
      launchStore.status !== ProcessStatus.LOADING
    ) {
      launchStore.fetchNextPage();
    }
  }, [launchStore]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreLaunches();
      }
    });

    if (bottomRef.current) observerRef.current.observe(bottomRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMoreLaunches]);

  return (
    <div>
      <PageHero
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        rightContent={renderLaunchCount()}
      />
      <div className='space-y-6 py-10 px-6 lg:py-0 lg:px-0'>
        <LaunchSearchToolbar />
        <div className='container mx-auto'>
          {renderContent()}
          <div ref={bottomRef} className='h-10'></div>
        </div>
      </div>
    </div>
  );
}

export default observer(LaunchesPage);
