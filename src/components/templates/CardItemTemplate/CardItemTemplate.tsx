import emptyImage from '@/assets/img/empty-image.png';
import Avatar from '@/components/atoms/Avatar/Avatar';
import Button from '@/components/atoms/Button/Button';
import { type FC } from 'react';
import { MdDelete, MdUpdate } from 'react-icons/md';

interface CardItemTemplateProps {
  title: string;
  imageSrc: string;
  onDeleteItem: () => void;
  onUpdateItem: () => void;
  children: React.ReactNode;
  imageAlt?: string;
}

const CardItemTemplate: FC<CardItemTemplateProps> = ({
  title,
  imageSrc,
  imageAlt,
  onDeleteItem,
  onUpdateItem,
  children,
}) => (
  <li className="flex flex-col shadow-lg duration-200 hover:shadow-xl">
    <div className="flex flex-1 flex-col gap-2 rounded-t-lg bg-white p-3 lg:gap-3 lg:p-4">
      <div className="flex flex-col items-center gap-3 lg:gap-4">
        <Avatar src={imageSrc || emptyImage} alt={imageAlt === undefined ? title : imageAlt} />
        <h2 className="text-center text-base font-semibold capitalize lg:text-lg">{title}</h2>
      </div>
      {children}
    </div>
    <div className="flex">
      <Button isBlack className="flex-1 rounded-none rounded-bl-lg lg:p-3" onClick={onUpdateItem}>
        <MdUpdate className="icon" />
        Update
      </Button>
      <Button isRed className="flex-1 rounded-none rounded-br-lg lg:p-3" onClick={onDeleteItem}>
        <MdDelete className="icon" />
        Delete
      </Button>
    </div>
  </li>
);

export default CardItemTemplate;
