import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Users, MessageSquare, FileText, Settings, Search, Plus, User } from 'lucide-react';

const ORG_LINKS = [
  { path: '/organization/dashboard', label: 'Dashboard', icon: <Building size={18} /> },
  { path: '/organization/manage-requests', label: 'Requests', icon: <FileText size={18} /> },
  { path: '/organization/post-request', label: 'Post Request', icon: <Plus size={18} /> },
  { path: '/organization/consultants', label: 'Consultants', icon: <Users size={18} /> },
  { path: '/organization/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
  { path: '/organization/search', label: 'Search', icon: <Search size={18} /> },
  { path: '/organization/profile', label: 'Profile', icon: <User size={18} /> },
  { path: '/organization/preferences', label: 'Preferences', icon: <Settings size={18} /> },
];

export default function OrganizationNavBar() {
  const location = useLocation();
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 w-full z-40 sticky top-0">
      <div className="flex gap-6 items-center overflow-x-auto">
        <span className="font-bold text-lg text-brand-blue mr-8">Org Navigation</span>
        {ORG_LINKS.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
              location.pathname.startsWith(link.path)
                ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
