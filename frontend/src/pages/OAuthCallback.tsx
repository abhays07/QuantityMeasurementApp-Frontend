import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { extractUserFromToken } from '../utils/jwt';

/**
 * OAuthCallback component handles the redirect from Google OAuth
 * Backend redirects here with ?token=JWT_TOKEN
 * This component extracts the token, logs in the user, and navigates to dashboard
 */
const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('No authentication token received. Please try again.');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
      return;
    }

    try {
      // Extract user information from JWT
      const user = extractUserFromToken(token);

      if (!user) {
        throw new Error('Failed to extract user information from token');
      }

      // Login the user (this will also store the token in localStorage)
      login(token, user);

      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      console.error('OAuth callback error:', err);
      
      // Redirect to login after 2 seconds
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    }
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <p className="text-slate-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-slate-600 mt-4">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
