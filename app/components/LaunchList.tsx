import { Launch } from '../models/spacex.model';
import LaunchCard from './LaunchCard';

const LaunchList = ({ launchList }: { launchList: Launch[] }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
      {launchList?.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}
    </div>
  );
};

export default LaunchList;
