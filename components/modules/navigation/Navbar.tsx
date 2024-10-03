'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" prefetch={false}>
              <span className="text-2xl font-bold text-primary">
                Divine Enlightenments
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="/settings"
                  className="text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                  prefetch={false}
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="hidden md:block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div> */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium"
              prefetch={false}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium"
              prefetch={false}
              onClick={toggleMenu}
            >
              Settings
            </Link>
          </div>
          {/* <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-foreground" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-foreground">
                  User Name
                </div>
                <div className="text-sm font-medium leading-none text-muted-foreground mt-1">
                  user@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Sign out
              </a>
            </div>
          </div> */}
        </div>
      )}
    </nav>
  );
}
