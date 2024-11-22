import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileTabNav from './MobileTabNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex w-full justify-around select-text bg-light-mode dark:bg-zinc-900 min-h-screen" >
        <Navbar />
        <MobileTabNav />
        <div className="flex-1 p-1">
          <div className='w-full max-w-7xl mx-auto'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const withLayout = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default withLayout;
