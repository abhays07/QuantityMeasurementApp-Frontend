import React from 'react';
import { Link } from 'react-router-dom';

interface AuthTabsProps {
  activeTab: 'login' | 'signup';
}

export const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab }) => {
  return (
    <div className="flex gap-8 mb-6 border-b-2 border-slate-200" role="tablist">
      <Link
        to="/login"
        role="tab"
        aria-selected={activeTab === 'login'}
        aria-controls="login-panel"
        className={`font-bold pb-3 transition-colors ${
          activeTab === 'login'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        LOGIN
      </Link>
      <Link
        to="/signup"
        role="tab"
        aria-selected={activeTab === 'signup'}
        aria-controls="signup-panel"
        className={`font-bold pb-3 transition-colors ${
          activeTab === 'signup'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        SIGNUP
      </Link>
    </div>
  );
};

AuthTabs.displayName = 'AuthTabs';
