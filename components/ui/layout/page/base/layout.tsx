import React, { ReactNode } from 'react';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';

interface BasePageLayoutProps {
  mainContent: ReactNode;
  footerContent: ReactNode;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  mainContent,
  footerContent,
}) => {
  return (
    <AnimatedContainer>
      <section className="grid grid-rows-[max-content] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mb-4 w-full">
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
export type { BasePageLayoutProps };
