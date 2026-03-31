import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthTabs } from '../components/auth/AuthTabs';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useApi } from '../hooks/useApi';
import { validateLoginForm } from '../utils/validation';
import { convertValidationErrorsToMap } from '../utils/formValidation';
import { extractUserFromToken } from '../utils/jwt';
import { loginUser, initiateGoogleLogin } from '../services/api';
import type { LoginCredentials } from '../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const { execute: loginExecute, isLoading: apiLoading } = useApi(loginUser);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const validateForm = (values: Record<string, any>) => {
    const validationErrors = validateLoginForm(values.email, values.password);
    return convertValidationErrorsToMap(validationErrors);
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm({
      initialValues: { email: '', password: '' } as LoginCredentials,
      validate: validateForm,
      onSubmit: async (values) => {
        setServerError(null);
        try {
          // API returns Axios response with { data: { token } }
          const response = await loginExecute(values as LoginCredentials);

          // Extract token from response
          if (!response || !response.token) {
            throw new Error('Invalid response from server');
          }

          const token = response.token;

          // Decode JWT to extract user information
          const user = extractUserFromToken(token);
          if (!user) {
            throw new Error('Failed to extract user information from token');
          }

          // If user was just registered, check for stored name from signup
          const pendingUserName = localStorage.getItem('pendingUserName');
          if (pendingUserName && user.email === values.email && !user.name) {
            user.name = pendingUserName;
            localStorage.removeItem('pendingUserName');
          }

          login(token, user);
          notifySuccess('Login successful!');
          navigate('/dashboard', { replace: true });
        } catch (error) {
          const err = error as Error;
          const message = err.message || 'Login failed. Please try again.';
          setServerError(message);
          notifyError(message);
          console.error('Login error:', err);
        }
      },
    });

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setServerError(null);
      // This will redirect the page to backend's OAuth endpoint
      // Backend handles auth and redirects back to /oauth-callback
      initiateGoogleLogin();
    } catch (error) {
      const message = 'Failed to initiate Google login';
      setServerError(message);
      notifyError(message);
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to access your dashboard."
    >
      <AuthTabs activeTab="login" />

      {serverError && (
        <Alert type="error" closeable onClose={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
          disabled={apiLoading || googleLoading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
          disabled={apiLoading || googleLoading}
        />

        <Button
          type="submit"
          size="md"
          isLoading={isSubmitting || apiLoading}
          disabled={googleLoading}
          className="w-full mt-6"
        >
          Sign In
        </Button>

        <div className="relative text-center my-4 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-slate-200">
          <span className="relative bg-white px-4 text-xs font-bold text-slate-500 z-10 uppercase">
            OR
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="md"
          className="w-full flex items-center justify-center gap-2"
          isLoading={googleLoading}
          disabled={apiLoading}
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5"
            alt="Google"
          />
          Continue with Google
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;