import emptyImage from '@/assets/img/empty-image.png';
import { type FC } from 'react';
import { MdEdit } from 'react-icons/md';
import Avatar from '../Avatar/Avatar';

interface ImageUploadFieldProps {
  file: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadField: FC<ImageUploadFieldProps> = ({ file, onChange }) => (
  <div className="relative">
    <div className="absolute right-0 top-2 z-10">
      <input id="avatar" type="file" className="hidden" onChange={onChange} accept=".png, .jpg, .jpeg" />
      <label
        htmlFor="avatar"
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-all hover:bg-silver"
      >
        <MdEdit className="text-sm" />
      </label>
    </div>
    <Avatar src={file.length === 0 ? emptyImage : file} />
  </div>
);

export default ImageUploadField;
