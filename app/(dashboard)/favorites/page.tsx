'use client';

import EmptyContentMessage from '@/app/components/EmptyContentMessage';
import LaunchList from '@/app/components/LaunchList';
import PageHero from '@/app/components/PageHero';
import { LoadingSpinner } from '@/app/components/Spinner';
import StoreContext from '@/app/context/StoreContext';
import { ProcessStatus } from '@/app/enums/spacex.enum';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';

const FavoritesPage = () => {
  const pageTitle = 'Favorites';
  const pageDescription =
    'Your collection of moments that changed space forever.';
  const emptyContentMessage = {
    title: 'This space looks empty.',
    description: 'Time to explore some launches!',
  };

  const { launchStore } = useContext(StoreContext);

  useEffect(() => {
    launchStore.listFavoriteItems({});
  }, [launchStore]);

  const renderContent = (): React.ReactNode => {
    switch (launchStore.status) {
      case ProcessStatus.LOADING:
        return (
          <div
            className='h-[33vh] flex flex-1 items-center justify-center'
            aria-live='polite'>
            <LoadingSpinner />
          </div>
        );
      case ProcessStatus.ERROR:
        return (
          <div role='alert' aria-live='assertive'>
            Error: {launchStore.error}
          </div>
        );
      case ProcessStatus.SUCCESS:
        if (launchStore.favoriteItemList?.length === 0) {
          return (
            <EmptyContentMessage
              title={emptyContentMessage.title}
              description={emptyContentMessage.description}
            />
          );
        }
        return <LaunchList launchList={launchStore.favoriteItemList} />;
      default:
        return <LaunchList launchList={launchStore.favoriteItemList} />;
    }
  };

  return (
    <div>
      <PageHero pageTitle={pageTitle} pageDescription={pageDescription} />
      <div className='space-y-6 py-10 px-6 lg:py-0 lg:px-0'>
        <div className='container mx-auto'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default observer(FavoritesPage);
