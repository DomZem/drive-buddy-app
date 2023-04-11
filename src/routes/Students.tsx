import DetailsList, { type detailsList } from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import UpdateCreateStudentForm from '@/components/organisms/UpdateCreateStudentForm/UpdateCreateStudentForm';
import CardItemTemplate from '@/components/templates/CardItemTemplate/CardItemTemplate';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { type ModalType, type StudentType } from '@/types';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { MdCategory, MdEmail, MdLocationCity, MdSmartphone } from 'react-icons/md';

const initialFormValues: StudentType = {
  id: '',
  firstName: '',
  lastName: '',
  city: '',
  avatar: '',
  phone: '',
  email: '',
  password: '',
  courseCategory: '',
};

const Students = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentType>(students[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');
  const [filterByName, setFilterByName] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<StudentType[]>([]);

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

  const handleDeleteStudent = async () => {
    const studentsDoc = doc(db, 'students', currentStudent.id);
    await deleteDoc(studentsDoc);
    void getStudents();
    handleCloseModal();
  };

  const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByName(e.target.value);
  };

  useEffect(() => {
    const filtered = students.filter((student) => {
      const studentFirstName = student.firstName.toLowerCase();
      const studentLastName = student.lastName.toLowerCase();

      return `${studentFirstName} ${studentLastName}`.includes(filterByName.toLowerCase());
    });
    setFilteredStudents(filtered);
  }, [filterByName, students]);

  useEffect(() => {
    void getStudents();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onInputChange={handleFilterName}
        onCreateItem={() => handleOpenItem('update-create', initialFormValues)}
        placeHolderText="Search some students by name ..."
      />
      {filteredStudents.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredStudents.map((student) => {
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
                icon: MdLocationCity,
                value: city,
              },
              {
                icon: MdCategory,
                value: courseCategory,
              },
            ];
            return (
              <CardItemTemplate
                title={`${firstName} ${lastName}`}
                imageSrc={avatar}
                onDeleteItem={() => {
                  handleOpenItem('delete', student);
                }}
                onUpdateItem={() => {
                  handleOpenItem('update-create', student);
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
            onDeleteItem={handleDeleteStudent}
            boldText={` ${currentStudent.firstName} ${currentStudent.lastName}`}
          />
        )}

        {currentModal === 'update-create' && (
          <UpdateCreateStudentForm formValues={currentStudent} onCloseModal={handleCloseModal} />
        )}
      </Modal>
    </PageTemplate>
  );
};

export default Students;
