import { type FC } from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}
const Label: FC<LabelProps> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mb-2 block font-medium text-gray-900">
    {children}
  </label>
);

export default Label;
