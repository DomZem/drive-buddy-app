import { type ButtonHTMLAttributes, type FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRed?: boolean;
  isWhite?: boolean;
  isGreen?: boolean;
  isBlack?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ isRed, isWhite, isGreen, isBlack, className, children, ...props }) => (
  <button
    className={`${
      isRed
        ? 'bg-red-600 text-white hover:bg-red-700'
        : isWhite
        ? 'bg-white text-gray-900 hover:bg-[#ddd]'
        : isGreen
        ? 'bg-green-600 text-white hover:bg-green-700'
        : isBlack
        ? 'bg-gray-800 text-white hover:bg-gray-900'
        : 'bg-blue-600 text-white hover:bg-blue-700'
    } inline-flex items-center justify-center gap-x-2 rounded-lg p-2 font-medium duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
