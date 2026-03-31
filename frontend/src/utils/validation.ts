import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants';
import type { ValidationError } from '../types';

export const validateEmail = (email: string): ValidationError | null => {
  if (!email) return { field: 'email', message: ERROR_MESSAGES.REQUIRED_FIELD };
  if (!VALIDATION_RULES.email.pattern.test(email)) {
    return { field: 'email', message: VALIDATION_RULES.email.message };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) return { field: 'password', message: ERROR_MESSAGES.REQUIRED_FIELD };
  if (password.length < VALIDATION_RULES.password.minLength) {
    return { field: 'password', message: VALIDATION_RULES.password.message };
  }
  return null;
};

export const validateName = (name: string): ValidationError | null => {
  if (!name) return { field: 'name', message: ERROR_MESSAGES.REQUIRED_FIELD };
  if (name.length < VALIDATION_RULES.name.minLength) {
    return { field: 'name', message: VALIDATION_RULES.name.message };
  }
  return null;
};

export const validateMobile = (mobile: string): ValidationError | null => {
  if (!mobile) return null; // Mobile is optional
  if (!VALIDATION_RULES.mobile.pattern.test(mobile)) {
    return { field: 'mobile', message: VALIDATION_RULES.mobile.message };
  }
  return null;
};

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  return errors;
};

export const validateSignupForm = (
  name: string,
  email: string,
  password: string,
  mobile?: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const nameError = validateName(name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  if (mobile) {
    const mobileError = validateMobile(mobile);
    if (mobileError) errors.push(mobileError);
  }

  return errors;
};
