import { useField } from 'formik';
import { type FC, type SelectHTMLAttributes } from 'react';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: string[];
}

const SelectField: FC<SelectFieldProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="relative">
        <select
          className={`field peer ${
            meta.touched && meta.error && 'border-red-600 text-red-600 focus:ring-red-600 peer-focus:text-red-600'
          }`}
          {...props}
          {...field}
        >
          {options.map((value) => (
            <option value={value} className="text-gray-900" key={value}>
              {value}
            </option>
          ))}
        </select>
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

export default SelectField;
