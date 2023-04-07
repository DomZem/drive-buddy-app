import { Field } from 'formik';
import { type FC } from 'react';

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({ id, name, type, placeholder, required }) => (
  <Field
    className="block w-full rounded-lg border border-gray-300 p-2 text-gray-900"
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    required={required}
  />
);

export default Input;
