import emptyImage from '@/assets/img/empty-image.png';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { courseCategories } from '@/constants';
import { db, storage } from '@/firebase/config';
import { type StudentType } from '@/types';
import { extractFilenameFromUrl } from '@/utility';
import { emailYup, nameYup, passwordYup, phoneYup } from '@/utility/yup';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { ref } from '@firebase/storage';
import { deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
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
  const [file, setFile] = useState<File | null>(null);

  // When there is an first name in formValues we have already created user and we want update data. When the first name is empty we want to create user.
  const isUpdateForm = formValues.firstName.length > 0;

  const handleCreateStudent = async (values: StudentType) => {
    try {
      if (file !== null) {
        const name = `students/(${faker.datatype.uuid()})${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', () => {
          void getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, 'students'), { ...values, avatar: downloadURL });
            toast.success('The Student has been created');
          });
        });
      } else {
        await addDoc(collection(db, 'students'), { ...values });
        toast.success('The Student has been created');
      }
    } catch (e) {
      toast.error('Something went wrong. The Student has not been created');
    } finally {
      onCloseModal();
    }
  };

  const handleUpdateStudent = async (values: StudentType) => {
    try {
      // If image in form is different that in firebase storage we should delete previos image
      if (file !== null) {
        // Delete the old file from Firebase Storage
        const deleteFileName = extractFilenameFromUrl(formValues.avatar);
        const prevAvatarRef = ref(storage, `students/${deleteFileName}`);
        await deleteObject(prevAvatarRef);

        // Upload the new file to Firebase Storage with the same file name as the old file
        const name = `students/(${faker.datatype.uuid()})${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen to the state change of the upload task
        uploadTask.on('state_changed', () => {
          void getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Update the student data in Firestore with the new download URL
            const studentRef = doc(db, 'students', formValues.id);
            await updateDoc(studentRef, { ...values, avatar: downloadURL });
            toast.success('The Student has been updated');
          });
        });
      } else {
        // If the new file is not selected or it is the same as the existing file, update only the other student data
        const studentRef = doc(db, 'students', formValues.id);
        await updateDoc(studentRef, { ...values });
        toast.success('The Student has been updated');
      }
    } catch (e) {
      toast.error('Something went wrong. The Student has not been updated');
    } finally {
      onCloseModal();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={isUpdateForm ? handleUpdateStudent : handleCreateStudent}
      validationSchema={StudentSchema}
    >
      <FormTemplate
        onCloseModal={onCloseModal}
        file={file !== null ? URL.createObjectURL(file) : formValues.avatar ? formValues.avatar : emptyImage}
        onFileChange={handleFileChange}
      >
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
