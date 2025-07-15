import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Settings, Briefcase, File, Calendar, MessageSquare, Home, Linkedin, Bell, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navLinks = [
  { title: 'Dashboard', url: '/consultant/dashboard', icon: <Home size={20} /> },
  { title: 'My Jobs', url: '/consultant/my-jobs', icon: <Briefcase size={20} /> },
  { title: 'Messages', url: '/consultant/messages', icon: <MessageSquare size={20} /> },
  { title: 'LinkedIn Jobs', url: '/consultant/linkedin-jobs', icon: <Linkedin size={20} /> },
  { title: 'Availability', url: '/consultant/availability', icon: <Calendar size={20} /> },
];

const NavLink = ({ to, pathname, children }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
      pathname.startsWith(to)
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {children}
  </Link>
);

const ProfileDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                </div>
                <span className="hidden md:inline">Aravind Reddy</span>
                <ChevronDown size={16} className="text-gray-500" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/consultant/profile"><User className="mr-2 h-4 w-4" />Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/consultant/documents"><File className="mr-2 h-4 w-4" />Documents</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/consultant/preferences"><Settings className="mr-2 h-4 w-4" />Preferences</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/logout"><LogOut className="mr-2 h-4 w-4" />Logout</Link></DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export default function ConsultantTopNav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/consultant/dashboard" className="flex items-center font-bold text-2xl text-gray-900">
                Insight<span className="text-blue-600">Advantage</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
                {navLinks.map(link => (
                    <NavLink key={link.title} to={link.url} pathname={pathname}>
                        {link.icon} <span className="hidden lg:inline">{link.title}</span>
                    </NavLink>
                ))}
            </nav>
        </div>

        <div className="flex items-center gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                        <Bell size={22} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full shadow-md animate-pulse"></span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 p-0 shadow-xl rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Bell size={20} className="text-blue-600" />
                            <span className="font-semibold text-lg text-gray-900">Notification Center</span>
                        </div>
                        <button className="text-xs text-blue-600 hover:underline font-medium">Mark all as read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 bg-white">
                        {/* Example notification */}
                        <div className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                                <MessageSquare size={18} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-gray-900">New message from Sarah Miller</div>
                                <div className="text-xs text-gray-500">"Hi, can we discuss the project details?"</div>
                                <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
                            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                <User size={18} className="text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-gray-900">Profile 75% complete</div>
                                <div className="text-xs text-gray-500">Complete your profile to get more job matches.</div>
                                <div className="text-xs text-gray-400 mt-1">Yesterday</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
                            <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
                                <File size={18} className="text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-gray-900">Document upload required</div>
                                <div className="text-xs text-gray-500">Please upload your latest certifications.</div>
                                <div className="text-xs text-gray-400 mt-1">2 days ago</div>
                            </div>
                        </div>
                        {/* Add more notifications as needed */}
                    </div>
                    <div className="px-5 py-3 border-t bg-gray-50 text-center">
                        <button className="text-blue-600 text-sm font-medium hover:underline">View all notifications</button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <ProfileDropdown />
            {/* Mobile Hamburger */}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(o => !o)}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t pb-4 px-2">
            <nav className="flex flex-col gap-2 mt-2">
                {navLinks.map(link => (
                    <NavLink key={link.title} to={link.url} pathname={pathname}>
                        {link.icon} <span>{link.title}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
      )}
    </header>
  );
} 