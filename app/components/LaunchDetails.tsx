import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Launch } from '../models/spacex.model';

const LaunchDetails = ({ launch }: { launch: Launch }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{ backgroundColor: theme === 'dark' ? '#292929' : '#F1F1F1' }}
      className='flex flex-col p-4 mx-6 rounded-lg'>
      <DetailSection
        title='Flight number'
        content={launch.flight_number?.toString()}
      />
      <DetailSection title='Rocket name' content={launch.rocket.name} />
      <DetailSection
        title='Mission details'
        content={launch.details ?? 'No details available'}
      />
      <DetailSection title='Region' content={launch.launchpad.region} />
      <div className='mt-4'>
        <p className='font-medium text-gray-500 dark:text-gray-400'>Image</p>
        {launch.rocket.flickr_images?.[0] && (
          <Image
            src={launch.rocket.flickr_images?.[0]}
            alt={`Rocket image ${launch.rocket.name}`}
            width={600}
            height={127}
            className='rounded-lg mt-2'
          />
        )}
      </div>
      <Separator />
      <div className='flex flex-col gap-[6px] py-4'>
        <p className='text-sm font-bold text-muted-foreground'>
          Links to media
        </p>
        <a
          href={launch.links.article ?? '#'}
          className='text-sm truncate'
          rel='noreferrer'
          target='_blank'>
          {launch.links.article ?? 'No article link available'}
        </a>
        <a
          href={launch.links.webcast ?? '#'}
          className='text-sm truncate'
          rel='noreferrer'
          target='_blank'>
          {launch.links.webcast ?? 'No webcast link available'}
        </a>
        <a
          href={launch.links.wikipedia ?? '#'}
          className='text-sm truncate'
          rel='noreferrer'
          target='_blank'>
          {launch.links.wikipedia ?? 'No Wikipedia link available'}
        </a>
      </div>
    </div>
  );
};

export default LaunchDetails;

const DetailSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className='mt-0'>
      <div className='flex flex-col gap-[6px] py-4'>
        <p className='text-sm font-bold text-muted-foreground'>{title}</p>
        <p className='text-sm'>{content}</p>
      </div>
      <Separator />
    </div>
  );
};
