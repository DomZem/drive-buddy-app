import { Field } from 'formik';
import { type FC, type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ id, name, label, ...props }) => (
  <div className="relative">
    <Field
      id={id}
      name={name}
      className="peer block w-full appearance-none rounded-lg border bg-transparent p-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 peer-focus:text-gray-900"
      placeholder=" "
      {...props}
    />
    <label
      htmlFor={id}
      className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 font-medium text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-gray-900"
    >
      {label}
    </label>
  </div>
);

export default InputField;
