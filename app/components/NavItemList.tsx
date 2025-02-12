import { APP_ROUTES } from '@/app/constants/spacex.constant';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItemList = () => {
  const pathname = usePathname();

  return APP_ROUTES.map((route) => {
    const isSelected = pathname === route.path;
    return (
      <div key={route.path} className='flex flex-1 items-center'>
        <Link href={route.path} className='flex flex-1 items-center m-0'>
          <Button
            variant={'ghost'}
            className={`h-full w-full flex flex-1 h-[73px] m-0 rounded-none border-l border-gray-100 lg:border-none lg:h-auto ${
              !isSelected ? 'text-muted-foreground' : ''
            }`}>
            {route.label}
          </Button>
        </Link>
      </div>
    );
  });
};

export default NavItemList;
