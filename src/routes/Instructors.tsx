import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import UpdateCreateInstructorForm from '@/components/organisms/UpdateCreateInstructorForm/UpdateCreateInstructorForm';
import CardItem from '@/components/templates/CardItem/CardItem';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/userModa';
import { db } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { MdCategory, MdEmail, MdLocationCity, MdOutlineAdd, MdSmartphone } from 'react-icons/md';

export type ModalType = 'delete' | 'update-create';

const initialFormValues: InstructorType = {
  id: '',
  firstName: '',
  lastName: '',
  city: '',
  avatar: '',
  phone: '',
  email: '',
  password: '',
  license: '',
};

const Instructors = () => {
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');
  const [currentInstructor, setCurrentInstructor] = useState<InstructorType>(instructors[0]);
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const instructorsCollectionRef = collection(db, 'instructors');

  const handleOpenItem = (modal: ModalType, currentItem: InstructorType) => {
    if (modal === 'delete') {
      setCurrentModal('delete');
    } else {
      setCurrentModal('update-create');
    }
    setCurrentInstructor(currentItem);
    handleOpenModal();
  };

  const handleDeleteInstructor = async () => {
    const instructorDoc = doc(db, 'instructors', currentInstructor.id);
    await deleteDoc(instructorDoc);
    void getInstructors();
    handleCloseModal();
  };

  const getInstructors = async () => {
    const data = await getDocs(instructorsCollectionRef);
    setInstructors(
      data.docs.map((doc) => ({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        city: doc.data().city,
        avatar: doc.data().avatar,
        phone: doc.data().phone,
        email: doc.data().email,
        password: doc.data().password,
        license: doc.data().license,
      }))
    );
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
          placeholder="Search some instructors by name ..."
        />

        {/* When we click to create button we pass empty form values */}
        <button
          className="inline-flex items-center justify-center gap-x-2 rounded-full bg-blue-600 p-2 text-xs font-medium text-white duration-200 hover:bg-blue-700 lg:text-sm"
          onClick={() => handleOpenItem('update-create', initialFormValues)}
        >
          <MdOutlineAdd className="text-base lg:text-xl" />
        </button>
      </div>

      {instructors.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-4 lg:p-4 xl:grid-cols-3 2xl:grid-cols-4">
          {instructors.map((instructor) => {
            const { firstName, lastName, email, avatar, phone, license, city, id } = instructor;
            return (
              <CardItem
                title={`${firstName} ${lastName}`}
                imageSrc={avatar}
                handleDeleteCardItem={() => {
                  handleOpenItem('delete', instructor);
                }}
                // When we click to update button on card we pass current instructor data. We just change form values.
                handleUpdateCardItem={() => {
                  handleOpenItem('update-create', instructor);
                }}
                key={id}
              >
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
                    {license.split(', ')}
                  </li>
                  <li className="flex items-center gap-x-2 text-xs lg:text-sm">
                    <MdLocationCity className="text-base lg:text-xl" />
                    {city}
                  </li>
                </ul>
              </CardItem>
            );
          })}
        </ul>
      ) : null}

      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        {currentModal === 'delete' && (
          <DeleteItemModal
            handleCloseModal={handleCloseModal}
            handleDeleteItem={handleDeleteInstructor}
            boldText={` ${currentInstructor.firstName} ${currentInstructor.lastName}`}
          />
        )}

        {currentModal === 'update-create' && (
          <UpdateCreateInstructorForm formValues={currentInstructor} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default Instructors;
