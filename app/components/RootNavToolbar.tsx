'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import NavItemList from './NavItemList';

const RootNavToolbar: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className='fixed top-0 left-0 right-0 bg-white dark:bg-black z-50 w-full flex flex-row flex-1 items-center h-[56px] border-b border-gray-200 dark:border-gray-700 px-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {!!theme?.length &&
          (theme === 'dark' ? (
            <Image src={`/logo-dark.svg`} width={92} height={24} alt='logo' />
          ) : (
            <Image src={`/logo-light.svg`} width={92} height={24} alt='logo' />
          ))}
        <div className='flex items-center'>
          <div className='hidden lg:flex'>
            <NavItemList />
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme?.(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle theme'>
            <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RootNavToolbar;
