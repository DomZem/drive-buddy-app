import DetailsList, { type detailsList } from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import UpdateCreateStudentForm from '@/components/organisms/UpdateCreateStudentForm/UpdateCreateStudentForm';
import CardItemTemplate from '@/components/templates/CardItemTemplate/CardItemTemplate';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db, storage } from '@/firebase/config';
import { type ModalType, type StudentType } from '@/types';
import { extractFilenameFromUrl } from '@/utility';
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const Students = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentType>(students[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');

  const [filterByName, setFilterByName] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<StudentType[]>([]);

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

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
    const studentDoc = doc(db, 'students', currentStudent.id);
    try {
      // Delete image from firebase storage
      if (currentStudent.avatar.length > 0) {
        const deleteFileName = extractFilenameFromUrl(currentStudent.avatar);
        const prevAvatarRef = ref(storage, `students/${deleteFileName}`);
        await deleteObject(prevAvatarRef);
      }

      await deleteDoc(studentDoc);
      toast.success('The Student has been deleted');
    } catch (e) {
      toast.error('Something went wrong. The Student has not been deleted');
    } finally {
      handleCloseModal();
    }
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
    const unsub = onSnapshot(
      collection(db, 'students'),
      (snapshot) => {
        const list: StudentType[] = [];
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
            courseCategory: doc.data().courseCategory,
          })
        );
        setStudents(list);
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
        placeHolderText="Search some students by name ..."
      />
      {filteredStudents.length > 0 ? (
        <motion.ul
          className="container grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
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
        </motion.ul>
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
