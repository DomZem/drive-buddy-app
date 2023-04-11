import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Field, Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdPersonAddAlt1, MdUpdate } from 'react-icons/md';

interface UpdateCreateInstructorFormProps {
  formValues: InstructorType;
  onCloseModal: () => void;
}

const UpdateCreateInstructorForm: FC<UpdateCreateInstructorFormProps> = ({ formValues, onCloseModal }) => {
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateInstructor = async (values: InstructorType, { setSubmitting }: FormikHelpers<InstructorType>) => {
    try {
      await addDoc(collection(db, 'instructors'), { ...values, avatar: file, id: faker.datatype.uuid() });
      setFile('');
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      onCloseModal();
    }
  };

  const handleUpdateInstructor = async (values: InstructorType, { setSubmitting }: FormikHelpers<InstructorType>) => {
    try {
      const instructorRef = doc(db, 'instructors', formValues.id);
      await updateDoc(instructorRef, { ...values, avatar: file });
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
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
    <Formik initialValues={formValues} onSubmit={isUpdateForm ? handleUpdateInstructor : handleCreateInstructor}>
      <FormTemplate file={file} onUploadImage={handleUploadImage} onCloseModal={onCloseModal}>
        <InputField id="firstName" label="First name" name="firstName" required />
        <InputField id="lastName" label="Last name" name="lastName" required />
        <InputField id="email" label="Email" name="email" required />
        <InputField id="password" label="Password" name="password" type="password" required />
        <InputField id="phone" label="Phone" name="phone" required />
        <InputField id="city" label="City" name="city" required />

        <div className="col-span-full">
          <label htmlFor="license" className="mb-2 block text-sm font-medium text-rich-black">
            License
          </label>
          <Field
            id="license"
            name="license"
            className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
            placeholder="AM, B2, C+E ..."
            required
          />
        </div>

        <Button isGreen type="submit">
          {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
          {isUpdateForm ? 'Update' : 'Create'}
        </Button>
      </FormTemplate>
    </Formik>
  );
};

export default UpdateCreateInstructorForm;
