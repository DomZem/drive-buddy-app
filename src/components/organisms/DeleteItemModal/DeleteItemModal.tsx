import Button from '@/components/atoms/Button/Button';
import { Dialog } from '@headlessui/react';
import { type FC } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { MdClose, MdDelete } from 'react-icons/md';

interface DeleteItemModalProps {
  onCloseModal: () => void;
  onDeleteItem: () => void;
  boldText: string;
}

const DeleteItemModal: FC<DeleteItemModalProps> = ({ onCloseModal, onDeleteItem, boldText }) => {
  return (
    <Dialog.Panel className="w-full max-w-lg">
      <div className="flex flex-col gap-y-3 rounded-t-lg bg-white p-4">
        <div className="flex flex-col items-center gap-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <IoWarningOutline className="icon text-red-600" />
          </div>
          <Dialog.Title as="h2" className="text-lg font-semibold lg:text-xl">
            Delete item
          </Dialog.Title>
        </div>
        <Dialog.Description>
          Are you sure you want to delete
          <span className="font-semibold">{boldText}</span>? All of data will be permanently removed. This action cannot
          be undone.
        </Dialog.Description>
      </div>
      <div className="flex justify-end gap-x-3 rounded-b-lg bg-rich-black p-3">
        <Button isWhite onClick={onCloseModal}>
          <MdClose className="icon" />
          Cancel
        </Button>
        <Button isRed onClick={onDeleteItem} type="submit">
          <MdDelete className="icon" />
          Delete
        </Button>
      </div>
    </Dialog.Panel>
  );
};

export default DeleteItemModal;
