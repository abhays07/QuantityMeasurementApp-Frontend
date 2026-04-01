import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthTabs } from '../components/auth/AuthTabs';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { useForm } from '../hooks/useForm';
import { useNotification } from '../hooks/useNotification';
import { useApi } from '../hooks/useApi';
import { validateSignupForm } from '../utils/validation';
import { convertValidationErrorsToMap } from '../utils/formValidation';
import { registerUser } from '../services/api';
import type { SignupData } from '../types';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const { execute: signupExecute, isLoading: apiLoading } = useApi(registerUser);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const validateForm = (values: Record<string, any>) => {
    const validationErrors = validateSignupForm(
      values.name,
      values.email,
      values.password,
      values.mobile
    );
    return convertValidationErrorsToMap(validationErrors);
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm({
      initialValues: {
        name: '',
        email: '',
        password: '',
        mobile: '',
      } as SignupData,
      validate: validateForm,
      onSubmit: async (values) => {
        setServerError(null);
        try {
          await signupExecute(values as SignupData);
          // Store the user's name in localStorage for use after login
          localStorage.setItem('pendingUserName', values.name);
          notifySuccess('Registration successful! Please login.');
          navigate('/login');
        } catch (error: any) {
          // Error from useApi is already parsed with { message, status, data }
          let message = 'Registration failed. Please try again.';
          
          if (error.status === 400) {
            message = 'Email already exists or invalid data. Please try again.';
          } else if (error.data?.message) {
            message = error.data.message;
          } else if (error.message && error.message !== 'Request failed with status code 400') {
            message = error.message;
          }
          
          setServerError(message);
          // Duration 0 means notification won't auto-close - user must close it manually
          notifyError(message, 0);
        }
      },
    });

  return (
    <AuthLayout
      title="Join Quant-Ment"
      subtitle="Accurate measurements synced to your account."
    >
      <AuthTabs activeTab="signup" />

      {serverError && (
        <Alert type="error" closeable onClose={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : undefined}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
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
        />

        <Input
          label="Phone Number (Optional)"
          type="tel"
          name="mobile"
          placeholder="Enter your phone number"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.mobile ? errors.mobile : undefined}
        />

        <Button
          type="submit"
          size="md"
          isLoading={isSubmitting || apiLoading}
          className="w-full mt-6"
        >
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;