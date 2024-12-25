'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-background border-b shadow-sm bg-transparent absolute w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" prefetch={false}>
              <span className="text-2xl font-bold text-primary">The Duskwall Dispatch</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className={`text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-accent text-accent-foreground' : ''}`}
                  prefetch={false}
                >
                  Otthon
                </Link>
                <Link
                  href="/news"
                  className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium ${isActive('/news') ? 'bg-accent text-accent-foreground' : ''}`}
                  prefetch={false}
                >
                  Hírek
                </Link>
                <Link
                  href="/characters"
                  className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium ${isActive('/characters') ? 'bg-accent text-accent-foreground' : ''}`}
                  prefetch={false}
                >
                  Karakterek
                </Link>
                <Link
                  href="/items"
                  className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium ${isActive('/items') ? 'bg-accent text-accent-foreground' : ''}`}
                  prefetch={false}
                >
                  Tárgyak
                </Link>
                <Link
                  href="/settings"
                  className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium ${isActive('/settings') ? 'bg-accent text-accent-foreground' : ''}`}
                  prefetch={false}
                >
                  Beállítások
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-accent text-accent-foreground' : ''}`}
              prefetch={false}
              onClick={toggleMenu}
            >
              Otthon
            </Link>
            <Link
              href="/news"
              className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium ${isActive('/news') ? 'bg-accent text-accent-foreground' : ''}`}
              prefetch={false}
              onClick={toggleMenu}
            >
              Hírek
            </Link>
            <Link
              href="/characters"
              className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium ${isActive('/characters') ? 'bg-accent text-accent-foreground' : ''}`}
              prefetch={false}
              onClick={toggleMenu}
            >
              Karakterek
            </Link>
            <Link
              href="/items"
              className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium ${isActive('/items') ? 'bg-accent text-accent-foreground' : ''}`}
              prefetch={false}
              onClick={toggleMenu}
            >
              Tárgyak
            </Link>
            <Link
              href="/settings"
              className={`text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium ${isActive('/settings') ? 'bg-accent text-accent-foreground' : ''}`}
              prefetch={false}
              onClick={toggleMenu}
            >
              Beállítások
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
