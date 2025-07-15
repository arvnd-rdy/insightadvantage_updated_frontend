import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Users, MessageSquare, FileText, Settings, Search, Plus, User, LogOut, Briefcase } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const ORG_LINKS = [
  { path: '/organization/dashboard', label: 'Dashboard', icon: <Building size={18} /> },
  { path: '/organization/manage-requests', label: 'Requests', icon: <FileText size={18} /> },
  { path: '/organization/post-request', label: 'Post Request', icon: <Plus size={18} /> },
  { path: '/organization/consultants', label: 'Consultants', icon: <Users size={18} /> },
  { path: '/organization/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
  { path: '/organization/find-consultants', label: 'Find Consultants', icon: <Search size={18} /> },
];

export default function OrganizationNavBar() {
  const location = useLocation();
  const userName = "Organization User"; // Replace with actual user name from auth context
  const userAvatar = ""; // Replace with actual user avatar URL from auth context

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 w-full z-40 sticky top-0 shadow-sm">
      <div className="flex justify-between items-center h-12">
        {/* Logo or Brand Name */}
        <Link to="/organization/dashboard" className="flex items-center gap-2">
          <span className="font-bold text-xl text-blue-600">Insight Advantage</span>
        </Link>

        {/* Main Navigation */}
        <Menubar className="hidden md:flex space-x-1 bg-transparent border-none">
          {ORG_LINKS.map(link => (
            <MenubarMenu key={link.path}>
              <Link to={link.path}>
                <MenubarTrigger
                  className={`font-medium transition-colors ${
                    location.pathname.startsWith(link.path)
                      ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.label}
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          ))}
        </Menubar>

        {/* User Profile and Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  organization@example.com {/* Replace with actual user email */}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/organization/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/organization/preferences">
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
