import { Field } from 'formik';
import { type FC, type SelectHTMLAttributes } from 'react';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  name: string;
  options: string[];
}

const SelectField: FC<SelectFieldProps> = ({ id, name, label, options, ...props }) => (
  <div className="relative">
    <Field id={id} as="select" name={name} className="field peer peer-focus:text-gray-900" {...props}>
      {options.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </Field>
    <label className="label peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-gray-900">
      {label}
    </label>
  </div>
);

export default SelectField;
