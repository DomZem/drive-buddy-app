import DetailsList from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import CardItemTemplate from '@/components/templates/CardItemTemplate/CardItemTemplate';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { ModalType, type LessonType } from '@/types';
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCarAlt, FaUser, FaUserTie } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

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

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonType>(lessons[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const handleOpenItem = (modal: ModalType, currentItem: LessonType) => {
    if (modal === 'delete') {
      setCurrentModal('delete');
    } else {
      setCurrentModal('update-create');
    }
    setCurrentLesson(currentItem);
    handleOpenModal();
  };

  const handleDeleteStudent = async () => {
    const studentDoc = doc(db, 'lessons', currentLesson.id);
    try {
      await deleteDoc(studentDoc);
      toast.success('The Lesson has been deleted');
    } catch (e) {
      toast.error('Something went wrong. The Lesson has not been deleted');
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'lessons'),
      (snapshot) => {
        const list: LessonType[] = [];
        snapshot.docs.forEach((doc) =>
          list.push({
            id: doc.id,
            date: doc.data().date,
            instructorId: doc.data().instructorId,
            carId: doc.data().carId,
            studentsId: doc.data().studentsId,
            avatar: doc.data().avatar,
            courseCategory: doc.data().courseCategory,
            lessonType: doc.data().lessonType,
            location: doc.data().location,
          })
        );
        setLessons(list);
      },
      () => toast.error('There was some error')
    );

    return () => unsub();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onInputChange={() => console.log('Hello world!')}
        onCreateItem={() => console.log('Hello world!')}
        placeHolderText="Search some lessons by title ..."
      />

      {lessons.length > 0 ? (
        <motion.ul
          className="container grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {lessons.map((lesson) => {
            const { id, location, lessonType, courseCategory, avatar, date } = lesson;

            const detailsList = [
              {
                icon: MdDateRange,
                value: `Date: ${date}`,
              },
              {
                icon: FaUserTie,
                value: `Instructor: `,
              },
              {
                icon: FaUser,
                value: `Students:`,
              },
              {
                icon: FaCarAlt,
                value: `Car:`,
              },
            ];

            return (
              <CardItemTemplate
                title={`${lessonType} (${courseCategory}) - ${location}`}
                imageSrc={avatar}
                onDeleteItem={() => {
                  handleOpenItem('delete', lesson);
                }}
                onUpdateItem={() => console.log('Item has been updated!')}
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
            boldText={` ${currentLesson.lessonType} (${currentLesson.courseCategory}) lesson in ${currentLesson.location} at ${currentLesson.date}`}
          />
        )}
      </Modal>
    </PageTemplate>
  );
};

export default Lessons;
