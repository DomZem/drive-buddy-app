import Modal from '@/components/organisms/Modal/Modal';
import useModal from '@/components/organisms/Modal/userModa';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { type InstructorType } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { IoWarningOutline } from 'react-icons/io5';
import { MdCategory, MdClose, MdDelete, MdEmail, MdLocationCity, MdSmartphone, MdUpdate } from 'react-icons/md';

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
  const isBreakpoint = useMediaQuery(767);

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
    <div className="mx-auto flex h-full max-w-7xl flex-col gap-y-2 p-2 md:gap-y-4">
      {instructors.length > 0 ? (
        isBreakpoint ? (
          <ul className="flex flex-1 flex-col divide-y divide-gray-200 overflow-y-auto rounded-lg bg-white px-4 py-2 shadow-lg">
            {instructors.map((instructor) => (
              <li className="py-3 sm:py-4" key={instructor.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={instructor.avatar}
                      alt={`${instructor.firstName} ${instructor.lastName} image`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {instructor.firstName} {instructor.lastName}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{instructor.email}</p>
                  </div>
                  <button className="p-1">
                    <HiDotsVertical className="text-base" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {instructors.map(({ firstName, lastName, avatar, phone, email, city, license, id }) => (
              <li className="flex flex-col shadow-lg" key={id}>
                <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-white p-4">
                  <div className="flex items-center gap-3 md:flex-col">
                    <img className="h-24 w-24 rounded-full" src={avatar} alt={`${firstName} ${lastName} profile`} />
                    <h2 className="text-xl font-semibold text-rich-black">
                      {firstName} {lastName}
                    </h2>
                  </div>
                  <ul className="flex flex-col items-start gap-y-3 font-medium">
                    <li className="flex items-center gap-x-2 text-xs md:text-sm">
                      <MdEmail className="text-base md:text-xl" />
                      {email}
                    </li>
                    <li className="flex items-center gap-x-2 text-xs md:text-sm">
                      <MdSmartphone className="text-base md:text-xl" />
                      {phone}
                    </li>
                    <li className="flex items-center gap-x-2 text-xs font-medium md:text-sm">
                      <MdCategory className="text-base md:text-xl" />
                      {license.join(', ')}
                    </li>
                    <li className="flex items-center gap-x-2 text-xs md:text-sm">
                      <MdLocationCity className="text-base md:text-xl" />
                      {city}
                    </li>
                  </ul>
                </div>
                <div className="flex">
                  <button
                    className="flex flex-1 items-center justify-center gap-x-2 rounded-bl-lg bg-rich-black p-2 text-xs font-medium text-white duration-200 hover:bg-[#000605] md:p-3 md:text-sm"
                    onClick={() => {
                      handleOpenItem('view', {
                        id,
                        name: `${firstName} ${lastName}`,
                      });
                    }}
                  >
                    <MdUpdate className="text-base md:text-xl" />
                    Update
                  </button>
                  <button
                    className="flex flex-1 items-center justify-center gap-x-2 rounded-br-lg bg-red p-2 text-xs font-medium text-white duration-200 hover:bg-[#ba0404] md:p-3 md:text-sm"
                    onClick={() => {
                      handleOpenItem('delete', {
                        id,
                        name: `${firstName} ${lastName}`,
                      });
                    }}
                  >
                    <MdDelete className="text-base md:text-xl" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
      ) : null}

      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        {currentModal === 'delete' && currentInstructor !== null ? (
          <>
            <div className="flex flex-col gap-y-3 bg-white p-3">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fee2e2]">
                  <IoWarningOutline className="text-base text-red md:text-xl" />
                </div>
                <h3 className="text-xl font-semibold">Delete data</h3>
              </div>
              <p className="text-xs md:text-sm">
                Are you sure you want to delete <span className="font-semibold">{currentInstructor.name}</span>? All of
                data will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-x-3 bg-rich-black p-3">
              <button
                className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-white p-2 text-xs font-medium text-rich-black duration-200 hover:bg-[#ddd] md:text-sm"
                onClick={handleCloseModal}
              >
                <MdClose className="text-base md:text-xl" />
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-red p-2 text-xs font-medium text-white duration-200 hover:bg-[#ba0404] md:text-sm"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
