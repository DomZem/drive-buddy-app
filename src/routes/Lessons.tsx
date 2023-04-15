import DetailsList from '@/components/molecules/DetailsList/DetailsList';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import CardItemTemplate from '@/components/templates/CardItemTemplate/CardItemTemplate';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { type LessonType } from '@/types';
import { collection, doc, getDoc, onSnapshot } from '@firebase/firestore';
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
            const { id, location, lessonType, courseCategory, avatar, date, carId } = lesson;
            const docRef = doc(db, 'cars', carId);

            void (async () => {
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                console.log('Document data:', docSnap.data());
              } else {
                // docSnap.data() will be undefined in this case
                console.log('No such document!');
              }
            })();

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
                value: `Car`,
              },
            ];

            return (
              <CardItemTemplate
                title={`${lessonType} (${courseCategory}) - ${location}`}
                imageSrc={avatar}
                onDeleteItem={() => console.log('Item has been deleted!')}
                onUpdateItem={() => console.log('Item has been updated!')}
                key={id}
              >
                <DetailsList list={detailsList} />
              </CardItemTemplate>
            );
          })}
        </motion.ul>
      ) : null}
    </PageTemplate>
  );
};

export default Lessons;
