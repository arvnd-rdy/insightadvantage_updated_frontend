import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Settings, Briefcase, File, Calendar, MessageSquare, Building, Home, Linkedin } from 'lucide-react';

const navLinks = [
  { title: 'Dashboard', url: '/consultant/dashboard', icon: <Home size={18} /> },
  { title: 'My Jobs', url: '/consultant/my-jobs', icon: <Briefcase size={18} /> },
  { title: 'My Profile', url: '/consultant/profile', icon: <User size={18} /> },
  { title: 'Documents', url: '/consultant/documents', icon: <File size={18} /> },
  { title: 'Availability', url: '/consultant/availability', icon: <Calendar size={18} /> },
  { title: 'Messages', url: '/consultant/messages', icon: <MessageSquare size={18} /> },
  { title: 'Find Jobs', url: '/consultant/findjobs', icon: <Building size={18} /> },
  { title: 'LinkedIn Jobs', url: '/consultant/linkedin-jobs', icon: <Linkedin size={18} /> },
  { title: 'Preferences', url: '/consultant/preferences', icon: <Settings size={18} /> },
];

export default function ConsultantTopNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/consultant/dashboard" className="flex items-center font-bold text-xl text-gray-900">
          Insight<span className="text-brand-blue">Advantage</span>
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map(link => (
            <Link
              key={link.title}
              to={link.url}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.url ? 'bg-brand-blue text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
        {/* Account/Logout */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/account/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings size={20} />
            </Button>
          </Link>
          <Link to="/logout">
            <Button variant="ghost" size="icon" className="rounded-full">
              <LogOut size={20} />
            </Button>
          </Link>
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 pb-4">
          <div className="flex flex-col gap-2 mt-2">
            {navLinks.map(link => (
              <Link
                key={link.title}
                to={link.url}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === link.url ? 'bg-brand-blue text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            ))}
            <Link to="/account/settings" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
              <Settings size={18} /> Account Settings
            </Link>
            <Link to="/logout" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
              <LogOut size={18} /> Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 