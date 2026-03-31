import React from 'react';
import { AuthContainer } from '../components/auth/AuthContainer';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <AuthContainer title={title} subtitle={subtitle}>
      {children}
    </AuthContainer>
  );
};

AuthLayout.displayName = 'AuthLayout';
