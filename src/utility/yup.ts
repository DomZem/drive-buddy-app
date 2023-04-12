import { courseCategories } from '@/constants';
import * as Yup from 'yup';

export const passwordYup = Yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  )
  .required('Required');

export const emailYup = Yup.string().email('Invalid email addresss').required('Required');

export const phoneYup = Yup.string()
  .matches(/^(\d{3}-\d{3}-\d{3}|\d{9})$/, 'Please enter a valid phone number in the format XXX-XXX-XXX or XXXXXXXXX')
  .required('Required');

export const nameYup = (name: string) =>
  Yup.string()
    .matches(
      /^[\p{L}\s'-]{3,}$/u,
      `${name} must contain only letters (without special characters) and have a minimum length of 3 characters`
    )
    .required('Required');

export const categoryYup = (message: string) =>
  Yup.string()
    .matches(
      /^([A-Za-z0-9]+,)*[A-Za-z0-9]+$/,
      `${message} must be a comma-separated list of ${courseCategories.join(', ')} `
    )
    .test('isValidCategories', `Invalid ${message}`, (value) => {
      if (!value) {
        return false;
      }
      const categories = value.split(',');
      const invalidCategories = categories.filter((category) => !courseCategories.includes(category));
      return invalidCategories.length === 0;
    })
    .test('hasAtLeastOneCategory', `At least one ${message} is required`, (value) => {
      if (!value) {
        return false;
      }
      const categories = value.split(',');
      return categories.length >= 1;
    })
    .required('Required');

export const oneOfYup = (listValues: string[], message: string) =>
  Yup.string()
    .oneOf(listValues, `${message} must be one of the following values: ${listValues.join(', ')}`)
    .required('Required');
