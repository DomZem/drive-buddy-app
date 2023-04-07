import Button from '@/components/atoms/Button/Button';
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
      <Button isBlack className="flex-1 rounded-none rounded-bl-lg lg:p-3" onClick={handleUpdateCardItem}>
        <MdUpdate className="icon" />
        Update
      </Button>
      <Button isRed className="flex-1 rounded-none rounded-br-lg lg:p-3" onClick={handleDeleteCardItem}>
        <MdDelete className="icon" />
        Delete
      </Button>
    </div>
  </li>
);

export default CardItem;
