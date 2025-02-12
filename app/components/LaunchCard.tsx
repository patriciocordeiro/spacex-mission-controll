import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import StoreContext from '../context/StoreContext';
import { LaunchStatus } from '../enums/spacex.enum';
import { Launch } from '../models/spacex.model';
import LaunchDetails from './LaunchDetails';

const LaunchCard = ({ launch }: { launch: Launch }) => {
  const { launchStore } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getLaunchStatus = () => {
      if (launch.success) return LaunchStatus.Success;
      if (launch.upcoming) return LaunchStatus.Upcoming;
      if (launch.failures) return LaunchStatus.Failure;
      return 'Unknown Status';
    };

    setStatus(getLaunchStatus());
  }, [launch]);

  const statusColorMap: { [key: string]: string } = {
    [LaunchStatus.Success]: '#1E9D1E',
    [LaunchStatus.Failure]: '#E53939',
    [LaunchStatus.Upcoming]: '#EA9935',
  };

  const handleAddToFavorites = (launch: Launch) => {
    launchStore.toggleFavorite(launch);
  };

  const getIsFavorite = () => {
    return launchStore.favoriteItemList?.some((item) => item.id === launch.id);
  };

  return (
    <Card
      className={`min-h-[210px] h-auto ${
        isOpen ? 'lg:h-auto' : 'lg:h-[200px] overflow-hidden'
      }`}>
      <CardHeader className='pt-0'>
        <div className='h-[68px] flex items-center justify-between w-full'>
          <Badge
            className='px-[6px] py-1 uppercase text-[10px] border rounded-sm'
            style={{
              borderColor: statusColorMap[status],
              color: statusColorMap[status],
            }}
            variant={'outline'}>
            {status}
          </Badge>
          <Button
            variant={'ghost'}
            onClick={() => handleAddToFavorites(launch)}
            size='icon'>
            <Heart size={36} color={getIsFavorite() ? 'red' : 'currentColor'} />
          </Button>
        </div>
        <CardTitle className='text-3xl truncate'>{launch.name}</CardTitle>
        <CardDescription className='text-sm'>
          Launch date:{' '}
          <span className='text-black dark:text-white'>{launch.date_utc}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex items-center justify-center p-0  min-h-[48px]'>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full '>
          <CollapsibleContent className='space-y-2 w-100 py-6'>
            <LaunchDetails launch={launch} />
          </CollapsibleContent>
          <Separator />
          <CollapsibleTrigger asChild className='w-full rounded-none'>
            <Button variant='ghost' className='w-full p-0 uppercase h-[48px]'>
              {isOpen ? (
                <>
                  Less details
                  <ChevronUp className='h-4 w-4' />
                </>
              ) : (
                <>
                  More details
                  <ChevronDown className='h-4 w-4' />
                </>
              )}
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardFooter>
    </Card>
  );
};

export default observer(LaunchCard);
