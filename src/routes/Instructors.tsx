import Modal from '@/components/organisms/Modal/Modal';
import useModal from '@/components/organisms/Modal/userModa';
import { type InstructorType } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BiCategory, BiShow } from 'react-icons/bi';
import { BsPhoneFill } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';
import { MdClose, MdDelete } from 'react-icons/md';

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
    <div className="mx-auto max-w-7xl">
      {instructors.length > 0 ? (
        <>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3 md:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] md:gap-4">
            {instructors.map(({ firstName, lastName, avatar, license, phone, id }) => (
              <li className="flex flex-col" key={id}>
                <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-white p-4">
                  <div className="flex items-center gap-3 md:flex-col">
                    <img
                      className="h-12 w-12 rounded-full md:h-20 md:w-20"
                      src={avatar}
                      alt={`${firstName} ${lastName} profile`}
                    />
                    <h2 className="font-semibold md:text-lg">
                      {firstName} {lastName}
                    </h2>
                  </div>
                  <ul className="flex flex-col items-start gap-y-3">
                    <li className="flex items-center gap-x-2 text-xs md:text-sm">
                      <BiCategory className="text-base md:text-xl" />
                      Licences - {license.join(', ')}
                    </li>
                    <li className="flex items-center gap-x-2 text-xs md:text-sm">
                      <BsPhoneFill className="text-base md:text-xl" />
                      {phone}
                    </li>
                  </ul>
                </div>
                <div className="flex">
                  <button className="flex flex-1 items-center justify-center gap-x-2 rounded-bl-lg bg-rich-black p-2 text-xs font-medium text-white duration-200 hover:bg-[#000605] md:p-3 md:text-sm">
                    <BiShow className="text-base md:text-xl" />
                    View
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
          <Modal isOpen={isOpen} handleClose={handleCloseModal}>
            {currentModal === 'delete' && currentInstructor !== null ? (
              <>
                <div className="flex flex-col gap-y-3 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fee2e2]">
                      <IoWarningOutline className="text-base text-red md:text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold">Delete data</h3>
                  </div>
                  <p className="text-xs md:text-sm">
                    Are you sure you want to delete <span className="font-semibold">{currentInstructor.name}</span>? All
                    of data will be permanently removed. This action cannot be undone.
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
        </>
      ) : null}
    </div>
  );
};

export default Instructors;
