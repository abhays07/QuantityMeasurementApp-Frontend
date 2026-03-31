import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import logo from '../assets/logo.svg';

import { ROUTES } from '../constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

// Helper function to get initials from name
const getInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  // Get display name - use user.name if available, otherwise use email
  const displayName = user?.name || user?.email || 'User';
  const initials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <h2 className="text-2xl font-black text-blue-600 hidden sm:block">Quant-Ment</h2>
          </div>
          <div className="flex gap-4 items-center">
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {initials}
                  </div>
                  <span className="font-bold text-slate-600 hidden md:block">Hi, {displayName}</span>
                </div>
              </div>
            )}
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-10 px-5">
        {title && (
          <h1 className="text-3xl font-bold text-slate-800 mb-8">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
