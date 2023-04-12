import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { courseCategories } from '@/constants';
import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Formik } from 'formik';
import { useState, type FC } from 'react';
import { MdPersonAddAlt1, MdUpdate } from 'react-icons/md';
import * as Yup from 'yup';

interface UpdateCreateInstructorFormProps {
  formValues: InstructorType;
  onCloseModal: () => void;
}

const InstructorSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[\p{L}\s'-]{3,}$/u,
      'First name must contain only letters (without special characters) and have a minimum length of 3 characters'
    )
    .required('Required'),
  lastName: Yup.string()
    .matches(
      /^[\p{L}\s'-]{3,}$/u,
      'First name must contain only letters (without special characters) and have a minimum length of 3 characters'
    )
    .required('Required'),
  email: Yup.string().email('Invalid email addresss').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    )
    .required('Required'),
  phone: Yup.string()
    .matches(/^(\d{3}-\d{3}-\d{3}|\d{9})$/, 'Please enter a valid phone number in the format XXX-XXX-XXX or XXXXXXXXX')
    .required('Required'),
  city: Yup.string().required('Required'),
  licenses: Yup.string()
    .matches(
      /^([A-Za-z0-9]+,)*[A-Za-z0-9]+$/,
      `Licenses must be a comma-separated list of ${courseCategories.join(', ')} `
    )
    .test('isValidLicenses', 'Invalid licenses', (value) => {
      if (!value) {
        return false;
      }
      const licenses = value.split(',');
      const invalidLicenses = licenses.filter((license) => !courseCategories.includes(license));
      return invalidLicenses.length === 0;
    })
    .test('hasAtLeastOneLicense', 'At least one license is required', (value) => {
      if (!value) {
        return false;
      }
      const categories = value.split(',');
      return categories.length >= 1;
    })
    .required('Required'),
});

const UpdateCreateInstructorForm: FC<UpdateCreateInstructorFormProps> = ({ formValues, onCloseModal }) => {
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateInstructor = async (values: InstructorType) => {
    try {
      await addDoc(collection(db, 'instructors'), { ...values, avatar: file, id: faker.datatype.uuid() });
      setFile('');
    } catch (e) {
      console.log(e);
    } finally {
      onCloseModal();
    }
  };

  const handleUpdateInstructor = async (values: InstructorType) => {
    try {
      const instructorRef = doc(db, 'instructors', formValues.id);
      await updateDoc(instructorRef, { ...values, avatar: file });
    } catch (e) {
      console.log(e);
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
