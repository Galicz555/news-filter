'use client';

import React, { ReactNode } from 'react';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import { usePathname } from 'next/navigation';

interface BasePageLayoutProps {
  mainContent?: ReactNode;
  footerContent: ReactNode;
  currentPath?: string;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({ mainContent, footerContent }) => {
  const getBackgroundImage = (path: string | null) => {
    switch (path) {
      case '/home':
        return '';
      case '/news':
        return '';
      case '/characters':
        return '';
      case '/items':
        return '';
      default:
        return '';
    }
  };

  const backgroundImage = getBackgroundImage(usePathname());

  return (
    <AnimatedContainer>
      <section
        className="grid grid-rows-[max-content] items-center justify-items-center min-h-screen p-8 gap-20 sm:p-20"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          {mainContent}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          {footerContent}
        </footer>
      </section>
    </AnimatedContainer>
  );
};

export default BasePageLayout;
