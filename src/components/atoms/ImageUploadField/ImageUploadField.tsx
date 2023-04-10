import { type FC } from 'react';
import { BsImageFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';

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
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white p-1 lg:h-24 lg:w-24">
      {file.length === 0 ? (
        <BsImageFill className="text-2xl lg:text-3xl" />
      ) : (
        <img className="rounded-full" src={file} />
      )}
    </div>
  </div>
);

export default ImageUploadField;
