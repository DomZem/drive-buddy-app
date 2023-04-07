import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import UpdateCreateInstructorForm from '@/components/organisms/UpdateCreateInstructorForm/UpdateCreateInstructorForm';
import CardItem from '@/components/templates/CardItem/CardItem';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/userModa';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { MdCategory, MdEmail, MdLocationCity, MdSmartphone } from 'react-icons/md';

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
  const [filterByName, setFilterByName] = useState('');
  const [filteredInstructors, setFilteredInstructors] = useState<InstructorType[]>([]);
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

  const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByName(e.target.value);
  };

  useEffect(() => {
    const filtered = instructors.filter((instructor) => {
      const instructorFirstName = instructor.firstName.toLowerCase();

      return instructorFirstName.includes(filterByName.toLowerCase());
    });
    setFilteredInstructors(filtered);
  }, [filterByName, instructors]);

  useEffect(() => {
    void getInstructors();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onHandleChange={handleFilterName}
        onHandleClick={() => handleOpenItem('update-create', initialFormValues)}
        placeHolderText="Search some instructors by name ..."
      />

      {filteredInstructors.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredInstructors.map((instructor) => {
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
                  <li className="flex items-center gap-x-2 font-medium">
                    <MdEmail className="text-xl lg:text-2xl" />
                    {email}
                  </li>
                  <li className="flex items-center gap-x-2 font-medium">
                    <MdSmartphone className="text-xl lg:text-2xl" />
                    {phone}
                  </li>
                  <li className="flex items-center gap-x-2 font-medium">
                    <MdCategory className="text-xl lg:text-2xl" />
                    {license.split(', ')}
                  </li>
                  <li className="flex items-center gap-x-2 font-medium">
                    <MdLocationCity className="text-xl lg:text-2xl" />
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
    </PageTemplate>
  );
};

export default Instructors;
