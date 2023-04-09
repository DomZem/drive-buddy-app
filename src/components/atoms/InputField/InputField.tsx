import { Field } from 'formik';
import { type FC, type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ id, name, label, ...props }) => (
  <div className="relative">
    <Field id={id} name={name} className="field peer peer-focus:text-gray-900" placeholder=" " {...props} />
    <label
      htmlFor={id}
      className="label peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-gray-900"
    >
      {label}
    </label>
  </div>
);

export default InputField;
