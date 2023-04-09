import { type FC, type ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Avatar: FC<AvatarProps> = ({ src, ...props }) => (
  <img src={src} className="h-20 w-20 rounded-full lg:h-24 lg:w-24" {...props} />
);

export default Avatar;
