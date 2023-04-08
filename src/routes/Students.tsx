import DetailsList, { type detailsList } from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import CardItem from '@/components/templates/CardItem/CardItem';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/userModa';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { type ModalType, type StudentType } from '@/types';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { MdCategory, MdEmail, MdLocationCity, MdSmartphone } from 'react-icons/md';

const Students = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentType>(students[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const studentsCollectionRef = collection(db, 'students');

  const getStudents = async () => {
    const data = await getDocs(studentsCollectionRef);
    setStudents(
      data.docs.map((doc) => ({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        city: doc.data().city,
        avatar: doc.data().avatar,
        phone: doc.data().phone,
        email: doc.data().email,
        password: doc.data().password,
        courseCategory: doc.data().courseCategory,
      }))
    );
  };

  const handleOpenItem = (modal: ModalType, currentItem: StudentType) => {
    if (modal === 'delete') {
      setCurrentModal('delete');
    } else {
      setCurrentModal('update-create');
    }
    setCurrentStudent(currentItem);
    handleOpenModal();
  };

  const handleDeleteCar = async () => {
    const studentsDoc = doc(db, 'students', currentStudent.id);
    await deleteDoc(studentsDoc);
    void getStudents();
    handleCloseModal();
  };

  useEffect(() => {
    void getStudents();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onHandleChange={() => console.log('hello!')}
        onHandleClick={() => console.log('hello!')}
        placeHolderText="Search some cars by name ..."
      />
      {students.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4">
          {students.map((student) => {
            const { firstName, lastName, email, avatar, phone, courseCategory, city, id } = student;
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
                value: courseCategory,
              },
              {
                icon: MdLocationCity,
                value: city,
              },
            ];
            return (
              <CardItem
                title={`${firstName} ${lastName}`}
                imageSrc={avatar}
                handleDeleteCardItem={() => {
                  handleOpenItem('delete', student);
                }}
                handleUpdateCardItem={() => {
                  console.log('hello!');
                }}
                key={id}
              >
                <DetailsList list={detailsList} />
              </CardItem>
            );
          })}
        </ul>
      ) : null}

      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        {currentModal === 'delete' && (
          <DeleteItemModal
            handleCloseModal={handleCloseModal}
            handleDeleteItem={handleDeleteCar}
            boldText={` ${currentStudent.firstName} ${currentStudent.lastName}`}
          />
        )}
      </Modal>
    </PageTemplate>
  );
};

export default Students;
