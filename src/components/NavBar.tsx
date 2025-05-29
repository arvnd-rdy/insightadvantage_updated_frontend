
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Menu, User } from 'lucide-react';

interface NavBarProps {
  isLoggedIn?: boolean;
  userRole?: 'consultant' | 'organization' | 'admin';
}

const NavBar = ({ isLoggedIn = false, userRole }: NavBarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-brand-blue">
            Insight<span className="text-brand-navy">Advantage</span>
          </Link>
        </div>

        {!isMobile ? (
          <div className="flex items-center gap-6">
            <Link to="/" className={`flex items-center gap-1 ${isActive('/') ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue transition-colors`}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`${isActive('/about') ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue transition-colors`}>
              About
            </Link>
            <Link to="/how-it-works" className={`${isActive('/how-it-works') ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue transition-colors`}>
              How It Works
            </Link>
            <Link to="/solutions" className={`${isActive('/solutions') ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue transition-colors`}>
              Solutions
            </Link>
            <Link to="/pricing" className={`${isActive('/pricing') ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue transition-colors`}>
              Pricing
            </Link>
            <Link to="/contact" className={`${isActive('/contact') ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue transition-colors`}>
              Contact
            </Link>
            
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to={`/${userRole}/dashboard`}>
                  <Button variant="ghost" className="gap-2">
                    <User size={18} />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/logout">
                  <Button variant="outline">Log out</Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full flex items-center gap-1">
                  <Home size={16} className="mr-1" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about" className="w-full">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/how-it-works" className="w-full">How It Works</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/solutions" className="w-full">Solutions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/pricing" className="w-full">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact" className="w-full">Contact</Link>
              </DropdownMenuItem>
              
              {!isLoggedIn ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full">Log in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="w-full">Get Started</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to={`/${userRole}/dashboard`} className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/logout" className="w-full">Log out</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
