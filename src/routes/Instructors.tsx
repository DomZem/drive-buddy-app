/* eslint-disable @typescript-eslint/no-misused-promises */
import Modal from '@/components/organisms/Modal/Modal';
import useModal from '@/components/organisms/Modal/userModa';
import { type InstructorType } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import {
  MdCategory,
  MdClose,
  MdDelete,
  MdEmail,
  MdLocationCity,
  MdOutlineAdd,
  MdSmartphone,
  MdUpdate,
} from 'react-icons/md';

export type ModalType = 'delete' | 'view';

export interface CurrentInstructorType {
  id: string;
  name: string;
}

const Instructors = () => {
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const [currentModal, setCurrentModal] = useState<ModalType>('view');
  const [currentInstructor, setCurrentInstructor] = useState<CurrentInstructorType | null>(null);

  const getInstructors = async () => {
    try {
      const response = await axios.get('/instructors');
      setInstructors(response.data.instructors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenItem = (modal: ModalType, currentItem: CurrentInstructorType) => {
    if (modal === 'delete') {
      setCurrentModal('delete');
    } else {
      setCurrentModal('view');
    }
    setCurrentInstructor(currentItem);
    handleOpenModal();
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/instructors/${currentInstructor?.id}`);
      void getInstructors();
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  useEffect(() => {
    void getInstructors();
  }, []);

  return (
    <div className="mx-auto h-full w-full max-w-7xl pt-[3.5rem] lg:pt-[4rem]">
      <div className="fixed left-[3.5rem] right-0 top-0 flex h-[3.5rem] items-center justify-between gap-x-3 bg-rich-black p-2 lg:left-[18rem] lg:h-[4rem] lg:p-3">
        <input
          className="w-full max-w-md rounded-lg px-2 py-1.5 text-xs text-rich-black outline-none lg:text-sm"
          type="text"
          placeholder="Search some instructors ..."
        />

        <button className="inline-flex items-center justify-center gap-x-2 rounded-full bg-blue-600 p-2 text-xs font-medium text-white duration-200 hover:bg-blue-700 lg:text-sm">
          <MdOutlineAdd className="text-base lg:text-xl" />
        </button>
      </div>

      {instructors.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-4 lg:p-4 xl:grid-cols-3 2xl:grid-cols-4">
          {instructors.map(({ firstName, lastName, avatar, phone, email, city, license, id }) => (
            <li className="flex flex-col shadow-lg" key={id}>
              <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-white p-4 lg:gap-4">
                <div className="flex flex-col items-center gap-3">
                  <img
                    className="h-14 w-14 rounded-full lg:h-24 lg:w-24"
                    src={avatar}
                    alt={`${firstName} ${lastName} profile`}
                  />
                  <h2 className="text-base font-semibold text-rich-black lg:text-xl">
                    {firstName} {lastName}
                  </h2>
                </div>
                <ul className="flex flex-col items-start gap-y-3 font-medium">
                  <li className="flex items-center gap-x-2 text-xs lg:text-sm">
                    <MdEmail className="text-base lg:text-xl" />
                    {email}
                  </li>
                  <li className="flex items-center gap-x-2 text-xs lg:text-sm">
                    <MdSmartphone className="text-base lg:text-xl" />
                    {phone}
                  </li>
                  <li className="flex items-center gap-x-2 text-xs font-medium lg:text-sm">
                    <MdCategory className="text-base lg:text-xl" />
                    {license.join(', ')}
                  </li>
                  <li className="flex items-center gap-x-2 text-xs lg:text-sm">
                    <MdLocationCity className="text-base lg:text-xl" />
                    {city}
                  </li>
                </ul>
              </div>
              <div className="flex">
                <button
                  className="flex flex-1 items-center justify-center gap-x-2 rounded-bl-lg bg-rich-black p-2 text-xs font-medium text-white duration-200 hover:bg-[#000605] lg:p-3 lg:text-sm"
                  onClick={() => {
                    handleOpenItem('view', {
                      id,
                      name: `${firstName} ${lastName}`,
                    });
                  }}
                >
                  <MdUpdate className="text-base lg:text-xl" />
                  Update
                </button>
                <button
                  className="bg-red flex flex-1 items-center justify-center gap-x-2 rounded-br-lg bg-red-600 p-2 text-xs font-medium text-white duration-200 hover:bg-red-700 lg:p-3 lg:text-sm"
                  onClick={() => {
                    handleOpenItem('delete', {
                      id,
                      name: `${firstName} ${lastName}`,
                    });
                  }}
                >
                  <MdDelete className="text-base lg:text-xl" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        {currentModal === 'delete' && currentInstructor !== null ? (
          <>
            <div className="flex flex-col gap-y-3 bg-white p-3">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <IoWarningOutline className="text-base text-red-600 lg:text-xl" />
                </div>
                <h3 className="text-xl font-semibold">Delete data</h3>
              </div>
              <p className="text-xs lg:text-sm">
                Are you sure you want to delete <span className="font-semibold">{currentInstructor.name}</span>? All of
                data will be permanently removed. This action cannot be undone.
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
                onClick={handleDeleteUser}
              >
                <MdDelete className="text-base md:text-xl" />
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white p-4">lesson data</div>
        )}
      </Modal>
    </div>
  );
};

export default Instructors;
