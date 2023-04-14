import emptyImage from '@/assets/img/empty-image.png';
import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { extractFilenameFromUrl } from '@/utility';
import { categoryYup, emailYup, nameYup, passwordYup, phoneYup } from '@/utility/yup';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Formik } from 'formik';
import { useState, type FC } from 'react';
import { toast } from 'react-hot-toast';
import { MdPersonAddAlt1, MdUpdate } from 'react-icons/md';
import * as Yup from 'yup';

interface UpdateCreateInstructorFormProps {
  formValues: InstructorType;
  onCloseModal: () => void;
}

const InstructorSchema = Yup.object({
  firstName: nameYup('First name'),
  lastName: nameYup('Last name'),
  email: emailYup,
  password: passwordYup,
  phone: phoneYup,
  city: Yup.string().required('Required'),
  licenses: categoryYup('Licenses'),
});

const UpdateCreateInstructorForm: FC<UpdateCreateInstructorFormProps> = ({ formValues, onCloseModal }) => {
  const [file, setFile] = useState<File | null>(null);

  // When there is an first name in formValues we have already created user and we want update data. When the first name is empty we want to create user.
  const isUpdateForm = formValues.firstName.length > 0;

  const handleCreateInstructor = async (values: InstructorType) => {
    try {
      if (file !== null) {
        const name = `instructors/(${faker.datatype.uuid()})${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', () => {
          void getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, 'instructors'), { ...values, avatar: downloadURL });
            toast.success('The Instructor has been created');
          });
        });
      } else {
        await addDoc(collection(db, 'instructors'), { ...values });
        toast.success('The Instructor has been created');
      }
    } catch (e) {
      toast.error('Something went wrong. The Instructor has not been created');
    } finally {
      onCloseModal();
    }
  };

  const handleUpdateInstructor = async (values: InstructorType) => {
    try {
      // If image in form is different that in firebase storage we should delete previos image
      if (file !== null) {
        // Delete the old file from Firebase Storage
        const deleteFileName = extractFilenameFromUrl(formValues.avatar);
        const prevAvatarRef = ref(storage, `instructors/${deleteFileName}`);
        await deleteObject(prevAvatarRef);

        // Upload the new file to Firebase Storage with the same file name as the old file
        const name = `instructors/(${faker.datatype.uuid()})${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen to the state change of the upload task
        uploadTask.on('state_changed', () => {
          void getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Update the student data in Firestore with the new download URL
            const studentRef = doc(db, 'instructors', formValues.id);
            await updateDoc(studentRef, { ...values, avatar: downloadURL });
            toast.success('The Instructor has been updated');
          });
        });
      } else {
        // If the new file is not selected or it is the same as the existing file, update only the other student data
        const studentRef = doc(db, 'instructors', formValues.id);
        await updateDoc(studentRef, { ...values });
        toast.success('The Instructor has been updated');
      }
    } catch (e) {
      toast.error('Something went wrong. The Instructor has not been updated');
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
      onSubmit={isUpdateForm ? handleUpdateInstructor : handleCreateInstructor}
      validationSchema={InstructorSchema}
    >
      <FormTemplate
        file={file !== null ? URL.createObjectURL(file) : formValues.avatar ? formValues.avatar : emptyImage}
        onFileChange={handleFileChange}
        onCloseModal={onCloseModal}
      >
        <InputField id="firstName" label="First name" name="firstName" />
        <InputField id="lastName" label="Last name" name="lastName" />
        <InputField id="email" label="Email" name="email" />
        <InputField id="password" label="Password" name="password" type="password" />
        <InputField id="phone" label="Phone" name="phone" />
        <InputField id="city" label="City" name="city" />
        <InputField id="licenses" label="Licenses" name="licenses" />

        <Button isGreen type="submit">
          {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
          {isUpdateForm ? 'Update' : 'Create'}
        </Button>
      </FormTemplate>
    </Formik>
  );
};

export default UpdateCreateInstructorForm;
