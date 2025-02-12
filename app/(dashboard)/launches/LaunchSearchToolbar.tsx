import { LAUNCH_STATUS } from '@/app/constants/spacex.constant';
import StoreContext from '@/app/context/StoreContext';
import { LaunchStatus } from '@/app/enums/spacex.enum';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Separator } from '@radix-ui/react-separator';
import { observer } from 'mobx-react-lite';
import { createRef, useContext, useEffect } from 'react';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

const LaunchSearchToolbar: React.FC = () => {
  const { launchStore } = useContext(StoreContext);
  const searchInputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        await launchStore.listItems({});
      } catch (error) {
        console.error('Failed to fetch launches:', error);
      }
    };
    fetchLaunches();
  }, [launchStore]);

  useEffect(() => {
    const subscription = fromEvent(searchInputRef.current!, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query) {
            return launchStore.listItems({});
          }
          return launchStore.searchItems({
            searchTerm: query,
            populate: [],
            page: 1,
          });
        })
      )
      .subscribe({
        error: (error) => console.error('Search subscription error:', error),
      });

    return () => subscription.unsubscribe();
  }, [launchStore, searchInputRef]);

  const handleFilterLaunchesByStatus = (status: string) => {
    let query: Record<string, boolean> = {};
    if (status === LaunchStatus.Failure) {
      query = {
        [LaunchStatus.Success.toLowerCase()]: false,
      };
    } else {
      query = {
        [status.toLowerCase()]: true,
      };
    }
    const payload = {
      query,
    };
    launchStore.listItems({
      query: payload.query,
    });
  };

  return (
    <>
      <div className='flex justify-center items-center pt-5'>
        <div className='container'>
          <div className='mt-4 flex justify-between items-center pl-3'>
            <div className='flex flex-1'>
              <span className='font-bold text-sm'>Launches</span>
            </div>
            <div className='flex flex-grow-0 gap-4 w-[50%]'>
              <Input
                className='bg-input'
                ref={searchInputRef}
                placeholder='Search for launches'
                aria-label='Search for launches'
              />
              <Select onValueChange={handleFilterLaunchesByStatus}>
                <SelectTrigger
                  className='bg-input w-[140px]'
                  aria-label='Filter by status'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  {LAUNCH_STATUS.map((status) => (
                    <SelectItem key={status} value={status} aria-label={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default observer(LaunchSearchToolbar);
