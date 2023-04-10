import Button from '@/components/atoms/Button/Button';
import ImageUploadField from '@/components/atoms/ImageUploadField/ImageUploadField';
import InputField from '@/components/atoms/InputField/InputField';
import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { Dialog } from '@headlessui/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdClose, MdPersonAddAlt1, MdUpdate } from 'react-icons/md';

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
      <Dialog.Panel as={Form} className="w-full max-w-xl">
        <div className="flex flex-col items-center justify-center gap-y-3 rounded-t-lg bg-rich-black p-4">
          <ImageUploadField file={file} onChange={handleUploadImage} />
        </div>

        <div className="grid grid-cols-2 gap-3 bg-white p-4">
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
        </div>

        <div className="flex justify-end gap-x-3 rounded-b-lg bg-rich-black p-3">
          <Button isWhite onClick={onCloseModal}>
            <MdClose className="icon" />
            Cancel
          </Button>
          <Button isGreen type="submit">
            {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
            {isUpdateForm ? 'Update' : 'Create'}
          </Button>
        </div>
      </Dialog.Panel>
    </Formik>
  );
};

export default UpdateCreateInstructorForm;
