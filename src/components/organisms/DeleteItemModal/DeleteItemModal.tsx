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
      <div className="flex flex-col gap-y-3 bg-white p-3">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <IoWarningOutline className="text-base text-red-600 lg:text-xl" />
          </div>
          <h3 className="text-xl font-semibold">Delete item</h3>
        </div>
        <p className="text-xs lg:text-sm">
          Are you sure you want to delete
          <span className="font-semibold">{boldText}</span>? All of data will be permanently removed. This action cannot
          be undone.
        </p>
      </div>
      <div className="flex justify-end gap-x-3 bg-rich-black p-3">
        <button
          className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-white p-2 text-xs font-medium text-rich-black duration-200 hover:bg-[#ddd] lg:text-sm"
          onClick={handleCloseModal}
        >
          <MdClose className="text-base md:text-xl" />
          Cancel
        </button>
        <button
          className="bg-red inline-flex items-center justify-center gap-x-2 rounded-lg bg-red-600 p-2 text-xs font-medium text-white duration-200 hover:bg-red-700 lg:text-sm"
          onClick={handleDeleteItem}
        >
          <MdDelete className="text-base md:text-xl" />
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteItemModal;
