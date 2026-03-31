import type { ValidationError } from '../types';

/**
 * Convert an array of ValidationError objects to a key-value map
 * Used in form submission to convert validation results into field error maps
 *
 * @param errors - Array of ValidationError objects from validation utility
 * @returns Object mapping field names to error messages, or undefined if no errors
 */
export const convertValidationErrorsToMap = (
  errors: ValidationError[]
): Record<string, string> | undefined => {
  if (!errors || errors.length === 0) {
    return undefined;
  }

  const errorMap: Record<string, string> = {};
  errors.forEach((err) => {
    errorMap[err.field] = err.message;
  });

  return Object.keys(errorMap).length > 0 ? errorMap : undefined;
};
