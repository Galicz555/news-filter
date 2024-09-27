import Link from 'next/link'
import { Menu, X, User } from 'lucide-react'
import { Button } from "@/app/components/ui/Button"

export default function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" prefetch={false}>
              <span className="text-2xl font-bold text-primary">MyApp</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium" prefetch={false}>Home</Link>
                <Link href="/about" className="text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium" prefetch={false}>About</Link>
                <Link href="/services" className="text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium" prefetch={false}>Services</Link>
                <Link href="/contact" className="text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium" prefetch={false}>Contact</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
