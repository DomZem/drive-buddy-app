import Button from '@/components/atoms/Button/Button';
import { type FC } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { MdClose, MdDelete } from 'react-icons/md';

interface DeleteItemModalProps {
  handleCloseModal: () => void;
  handleDeleteItem: () => void;
  boldText: string;
}

const DeleteItemModal: FC<DeleteItemModalProps> = ({ handleCloseModal, handleDeleteItem, boldText }) => {
  return (
    <>
      <div className="flex flex-col gap-y-3 bg-white p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <IoWarningOutline className="text-base text-red-600 lg:text-xl" />
          </div>
          <h2 className="text-xl font-semibold">Delete item</h2>
        </div>
        <p>
          Are you sure you want to delete
          <span className="font-semibold">{boldText}</span>? All of data will be permanently removed. This action cannot
          be undone.
        </p>
      </div>
      <div className="flex justify-end gap-x-2 bg-rich-black p-2">
        <Button isWhite onClick={handleCloseModal}>
          <MdClose className="icon" />
          Cancel
        </Button>
        <Button isRed onClick={handleDeleteItem} type="submit">
          <MdDelete className="icon" />
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteItemModal;
