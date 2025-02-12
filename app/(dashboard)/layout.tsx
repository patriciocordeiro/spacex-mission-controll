'use client';

import NavItemList from '../components/NavItemList';
import RootNavToolbar from '../components/RootNavToolbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Toolbar for desktop */}
      <div className='lg:flex justify-between items-center bg-white dark:bg-black'>
        <div className='container mx-auto'>
          <RootNavToolbar />
        </div>
      </div>

      {/* Main content */}
      <main className='flex-1 pb-20' role='main'>
        {children}
      </main>

      {/* Bottom navigation for mobile */}
      <nav
        className='lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black flex justify-around items-center h-[73px]'
        aria-label='Mobile Navigation'>
        <NavItemList />
      </nav>
    </div>
  );
};

export default DashboardLayout;
