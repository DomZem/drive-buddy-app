import DetailsList, { type detailsList } from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import UpdateCreateInstructorForm from '@/components/organisms/UpdateCreateInstructorForm/UpdateCreateInstructorForm';
import CardItemTemplate from '@/components/templates/CardItemTemplate/CardItemTemplate';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { type InstructorType, type ModalType } from '@/types';
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdCategory, MdEmail, MdLocationCity, MdSmartphone } from 'react-icons/md';

const initialFormValues: InstructorType = {
  id: '',
  firstName: '',
  lastName: '',
  city: '',
  avatar: '',
  phone: '',
  email: '',
  password: '',
  licenses: '',
};

const Instructors = () => {
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [currentInstructor, setCurrentInstructor] = useState<InstructorType>(instructors[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');

  const [filterByName, setFilterByName] = useState('');
  const [filteredInstructors, setFilteredInstructors] = useState<InstructorType[]>([]);

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

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
    try {
      await deleteDoc(instructorDoc);
      toast.success('The Instructor has been deleted');
    } catch (e) {
      toast.error('Something went wrong. The Instructor has not been deleted');
    } finally {
      handleCloseModal();
    }
  };

  const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByName(e.target.value);
  };

  useEffect(() => {
    const filtered = instructors.filter((instructor) => {
      const instructorFirstName = instructor.firstName.toLowerCase();
      const instructorLastName = instructor.lastName.toLowerCase();

      return `${instructorFirstName} ${instructorLastName}`.includes(filterByName.toLowerCase());
    });
    setFilteredInstructors(filtered);
  }, [filterByName, instructors]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'instructors'),
      (snapshot) => {
        const list: InstructorType[] = [];
        snapshot.docs.forEach((doc) =>
          list.push({
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            city: doc.data().city,
            avatar: doc.data().avatar,
            phone: doc.data().phone,
            email: doc.data().email,
            password: doc.data().password,
            licenses: doc.data().licenses,
          })
        );
        setInstructors(list);
      },
      () => toast.error('There was some error')
    );

    return () => unsub();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onInputChange={handleFilterName}
        onCreateItem={() => handleOpenItem('update-create', initialFormValues)}
        placeHolderText="Search some instructors by name ..."
      />

      {filteredInstructors.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredInstructors.map((instructor) => {
            const { firstName, lastName, email, avatar, phone, licenses, city, id } = instructor;
            const licenseSplit = licenses.split(', ').toString();
            const detailsList: detailsList = [
              {
                icon: MdEmail,
                value: email,
              },
              {
                icon: MdSmartphone,
                value: phone,
              },
              {
                icon: MdCategory,
                value: licenseSplit,
              },
              {
                icon: MdLocationCity,
                value: city,
              },
            ];
            return (
              <CardItemTemplate
                title={`${firstName} ${lastName}`}
                imageSrc={avatar}
                onDeleteItem={() => {
                  handleOpenItem('delete', instructor);
                }}
                // When we click to update button on card we pass current instructor data. We just change form values.
                onUpdateItem={() => {
                  handleOpenItem('update-create', instructor);
                }}
                key={id}
              >
                <DetailsList list={detailsList} />
              </CardItemTemplate>
            );
          })}
        </ul>
      ) : null}

      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        {currentModal === 'delete' && (
          <DeleteItemModal
            onCloseModal={handleCloseModal}
            onDeleteItem={handleDeleteInstructor}
            boldText={` ${currentInstructor.firstName} ${currentInstructor.lastName}`}
          />
        )}

        {currentModal === 'update-create' && (
          <UpdateCreateInstructorForm formValues={currentInstructor} onCloseModal={handleCloseModal} />
        )}
      </Modal>
    </PageTemplate>
  );
};

export default Instructors;
