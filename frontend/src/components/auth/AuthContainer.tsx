import React from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showIllustration?: boolean;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  title,
  subtitle,
  showIllustration = true,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-5">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Left Side (Branding) */}
        {showIllustration && (
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center p-8 text-center">
            <Link to={ROUTES.HOME} className="flex flex-col items-center hover:scale-105 transition-transform duration-200">
              <img
                src={logo}
                alt="Quant-Ment Home"
                className="w-3/4 max-w-[16rem] mb-6 drop-shadow-lg"
              />
              <h3 className="text-2xl font-extrabold text-slate-800">{title}</h3>
            </Link>
            {subtitle && <p className="text-slate-600 text-sm mt-2">{subtitle}</p>}
          </div>
        )}

        {/* Right Side (Form) */}
        <div className={`${showIllustration ? 'flex-[1.2]' : 'w-full'} p-6 md:p-10 flex flex-col justify-center`}>
          {children}
        </div>
      </div>
    </div>
  );
};

AuthContainer.displayName = 'AuthContainer';
