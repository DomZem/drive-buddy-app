import { type FC } from 'react';
import { MdDelete, MdUpdate } from 'react-icons/md';

interface CardItemProps {
  title: string;
  imageSrc: string;
  handleDeleteCardItem: () => void;
  handleUpdateCardItem: () => void;
  children: React.ReactNode;
  imageAlt?: string;
}

const CardItem: FC<CardItemProps> = ({
  title,
  imageSrc,
  imageAlt,
  handleUpdateCardItem,
  handleDeleteCardItem,
  children,
}) => (
  <li className="flex flex-col shadow-lg">
    <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-white p-4 lg:gap-4">
      <div className="flex flex-col items-center gap-3">
        <img
          className="h-14 w-14 rounded-full lg:h-24 lg:w-24"
          src={imageSrc}
          alt={imageAlt === undefined ? title : imageAlt}
        />
        <h2 className="text-base font-semibold text-rich-black lg:text-xl">{title}</h2>
      </div>
      {children}
    </div>
    <div className="flex">
      <button
        className="flex flex-1 items-center justify-center gap-x-2 rounded-bl-lg bg-rich-black p-2 text-xs font-medium text-white duration-200 hover:bg-[#000605] lg:p-3 lg:text-sm"
        onClick={handleUpdateCardItem}
      >
        <MdUpdate className="text-base lg:text-xl" />
        Update
      </button>
      <button
        className="bg-red flex flex-1 items-center justify-center gap-x-2 rounded-br-lg bg-red-600 p-2 text-xs font-medium text-white duration-200 hover:bg-red-700 lg:p-3 lg:text-sm"
        onClick={handleDeleteCardItem}
      >
        <MdDelete className="text-base lg:text-xl" />
        Delete
      </button>
    </div>
  </li>
);

export default CardItem;
