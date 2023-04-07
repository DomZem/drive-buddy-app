import Input from '@/components/atoms/Input/Input';
import Label from '@/components/atoms/Label/Label';
import { type FC } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

const FormField: FC<FormFieldProps> = ({ id, label, name, type, placeholder, required }) => (
  <div>
    <Label htmlFor={id}>{label}</Label>

    <Input id={id} name={name} type={type} placeholder={placeholder} required={required} />
  </div>
);

export default FormField;
