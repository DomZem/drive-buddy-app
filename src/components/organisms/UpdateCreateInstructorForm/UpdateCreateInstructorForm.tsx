import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { categoryYup, emailYup, nameYup, passwordYup, phoneYup } from '@/utility/yup';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
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
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateInstructor = async (values: InstructorType) => {
    try {
      await addDoc(collection(db, 'instructors'), { ...values, avatar: file });
      setFile('');
      toast.success('The Instructor has been created');
    } catch (e) {
      toast.error('Something went wrong. The Instructor has not been added');
    } finally {
      onCloseModal();
    }
  };

  const handleUpdateInstructor = async (values: InstructorType) => {
    try {
      const instructorRef = doc(db, 'instructors', formValues.id);
      await updateDoc(instructorRef, { ...values, avatar: file });
      toast.success('The Instructor has been updated');
    } catch (e) {
      toast.error('Something went wrong. The Instructor has not been updated');
    } finally {
      onCloseModal();
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file !== undefined) {
      const name = `${faker.datatype.uuid()}-${file.name}`;

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
      onSubmit={isUpdateForm ? handleUpdateInstructor : handleCreateInstructor}
      validationSchema={InstructorSchema}
    >
      <FormTemplate file={file} onUploadImage={handleUploadImage} onCloseModal={onCloseModal}>
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
