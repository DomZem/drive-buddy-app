import { useField } from 'formik';
import { type FC, type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="relative">
        <input
          className={`field peer ${
            meta.touched && meta.error && 'border-red-600 text-red-600 focus:ring-red-600 peer-focus:text-red-600'
          }`}
          placeholder=" "
          {...field}
          {...props}
        />
        <label
          htmlFor={props.id}
          className={`label peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 ${
            meta.touched && meta.error && 'text-red-600 peer-focus:text-red-600'
          }`}
        >
          {label}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <div className="mt-1 inline-block font-medium text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
