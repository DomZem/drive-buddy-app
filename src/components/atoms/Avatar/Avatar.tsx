import { type FC, type ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ src, className, ...props }) => (
  <img src={src} className={`h-20 w-20 rounded-full lg:h-24 lg:w-24 ${className}`} {...props} />
);

export default Avatar;
