import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { courseCategories } from '@/constants';
import { db, storage } from '@/firebase/config';
import { type StudentType } from '@/types';
import { emailYup, nameYup, passwordYup, phoneYup } from '@/utility/yup';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Formik } from 'formik';
import { useState, type FC } from 'react';
import toast from 'react-hot-toast';
import { MdPersonAddAlt1, MdUpdate } from 'react-icons/md';
import * as Yup from 'yup';

interface UpdateCreateStudentFormProps {
  formValues: StudentType;
  onCloseModal: () => void;
}

const StudentSchema = Yup.object({
  firstName: nameYup('First name'),
  lastName: nameYup('Last name'),
  email: emailYup,
  password: passwordYup,
  phone: phoneYup,
  city: Yup.string().required('Required'),
  courseCategory: Yup.string()
    .oneOf(courseCategories, `Course category must be one of the following values: ${courseCategories.join(', ')}`)
    .required('Required'),
});

const UpdateCreateStudentForm: FC<UpdateCreateStudentFormProps> = ({ formValues, onCloseModal }) => {
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateStudent = async (values: StudentType) => {
    try {
      await addDoc(collection(db, 'students'), { ...values, avatar: file, id: faker.datatype.uuid() });
      setFile('');
      toast.success('The Student has been created');
    } catch (e) {
      toast.error('Something went wrong. The Student has not been created');
    } finally {
      onCloseModal();
    }
  };

  const handleUpdateStudent = async (values: StudentType) => {
    try {
      const studentRef = doc(db, 'students', formValues.id);
      await updateDoc(studentRef, { ...values, avatar: file });
      toast.success('The Student has been updated');
    } catch (e) {
      toast.error('Something went wrong. The Student has not been updated');
    } finally {
      onCloseModal();
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file !== undefined) {
      const name = `students/${file.name}`;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', () => {
        // Upload completed successfully, now we can get the download URL
        void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
        });
      });
    }
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={isUpdateForm ? handleUpdateStudent : handleCreateStudent}
      validationSchema={StudentSchema}
    >
      <FormTemplate file={file} onUploadImage={handleUploadImage} onCloseModal={onCloseModal}>
        <InputField id="firstName" label="First name" name="firstName" />
        <InputField id="lastName" label="Last name" name="lastName" />
        <InputField id="email" label="Email" name="email" />
        <InputField id="password" label="Password" name="password" type="password" />
        <InputField id="phone" label="Phone" name="phone" />
        <InputField id="city" label="City" name="city" />
        <InputField id="courseCategory" label="Course category" name="courseCategory" />

        <Button isGreen type="submit">
          {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
          {isUpdateForm ? 'Update' : 'Create'}
        </Button>
      </FormTemplate>
    </Formik>
  );
};

export default UpdateCreateStudentForm;
