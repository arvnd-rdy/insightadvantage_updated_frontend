
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  User,
  Search,
  Settings,
  File,
  Building,
  Calendar,
  LogOut,
  Users,
  BarChart,
  MessageSquare,
  CreditCard,
  Bell,
  Heart,
  FolderOpen,
  Plus
} from 'lucide-react';

interface SidebarProps {
  role: 'consultant' | 'organization' | 'admin';
}

const DashboardSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const baseRoute = `/${role}`;
  
  // Menu items based on role
  const menuItems = {
    consultant: [
      {
        title: 'Dashboard',
        icon: Home,
        url: `${baseRoute}/dashboard`,
      },
      {
        title: 'My Profile',
        icon: User,
        url: `${baseRoute}/profile`,
      },
      {
        title: 'Documents',
        icon: File,
        url: `${baseRoute}/documents`,
      },
      {
        title: 'Availability',
        icon: Calendar,
        url: `${baseRoute}/availability`,
      },
      {
        title: 'Messages',
        icon: MessageSquare,
        url: `${baseRoute}/messages`,
      },
      {
        title: 'Organizations',
        icon: Building,
        url: `${baseRoute}/organizations`,
      },
      {
        title: 'Preferences',
        icon: Settings,
        url: `${baseRoute}/preferences`,
      },
    ],
    organization: [
      {
        title: 'Dashboard',
        icon: Home,
        url: `${baseRoute}/dashboard`,
      },
      {
        title: 'Company Profile',
        icon: Building,
        url: `${baseRoute}/profile`,
      },
      {
        title: 'Find Consultants',
        icon: Search,
        url: `${baseRoute}/search`,
      },
      {
        title: 'Saved Consultants',
        icon: Heart,
        url: `${baseRoute}/consultants`,
      },
      {
        title: 'Post Request',
        icon: Plus,
        url: `${baseRoute}/post-request`,
      },
      {
        title: 'Manage Requests',
        icon: FolderOpen,
        url: `${baseRoute}/manage-requests`,
      },
      {
        title: 'Messages',
        icon: MessageSquare,
        url: `${baseRoute}/messages`,
      },
      {
        title: 'Subscription',
        icon: CreditCard,
        url: `/subscription/plans`,
      },
      {
        title: 'Preferences',
        icon: Settings,
        url: `${baseRoute}/preferences`,
      },
    ],
    admin: [
      {
        title: 'Dashboard',
        icon: Home,
        url: `${baseRoute}/dashboard`,
      },
      {
        title: 'Users',
        icon: Users,
        url: `${baseRoute}/users`,
      },
      {
        title: 'Subscriptions',
        icon: CreditCard,
        url: `${baseRoute}/subscriptions`,
      },
      {
        title: 'Analytics',
        icon: BarChart,
        url: `${baseRoute}/analytics`,
      },
      {
        title: 'Notifications',
        icon: Bell,
        url: `${baseRoute}/notifications`,
      },
      {
        title: 'Settings',
        icon: Settings,
        url: `${baseRoute}/settings`,
      },
    ],
  };
  
  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-sidebar-foreground">
            Insight<span className="text-brand-blue">Advantage</span>
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/account/settings'}>
                  <Link to="/account/settings">
                    <Settings size={20} />
                    <span>Account Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto px-4 py-6">
          <Link 
            to="/logout" 
            className="flex items-center py-2 px-3 text-sidebar-foreground hover:text-sidebar-primary transition-colors rounded-md"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
