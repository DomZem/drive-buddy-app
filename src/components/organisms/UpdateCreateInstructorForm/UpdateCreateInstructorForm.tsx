import Button from '@/components/atoms/Button/Button';
import FormField from '@/components/molecules/FormField/FormField';
import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdClose, MdCloudUpload, MdPersonAddAlt1, MdUpdate } from 'react-icons/md';

interface UpdateCreateInstructorFormProps {
  formValues: InstructorType;
  handleCloseModal: () => void;
}

const UpdateCreateInstructorForm: FC<UpdateCreateInstructorFormProps> = ({ formValues, handleCloseModal }) => {
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
      handleCloseModal();
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
      handleCloseModal();
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
      <Form>
        <div className="flex flex-col items-center justify-center gap-y-3 bg-rich-black p-3">
          <img
            className="h-24 w-24 rounded-full"
            src={file.length === 0 ? 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' : file}
            alt=""
          />
          <label
            htmlFor="avatar"
            className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-white p-2 text-sm font-medium text-rich-black"
          >
            <MdCloudUpload className="text-base lg:text-xl" />
            Upload avatar
          </label>
          <input id="avatar" type="file" className="hidden" onChange={handleUploadImage} />
        </div>

        <div className="grid grid-cols-2 gap-3 bg-white p-3">
          <FormField label="First name" id="firstName" name="firstName" type="text" placeholder="First name" required />
          <FormField label="Last name" id="lastName" name="lastName" type="text" placeholder="Last name" required />
          <FormField label="Email" id="email" name="email" type="email" placeholder="Email" required />
          <FormField label="Password" id="password" name="password" type="password" placeholder="Password" required />
          <FormField label="Phone" id="phone" name="phone" type="text" placeholder="Phone" required />
          <FormField label="City" id="city" name="city" type="text" placeholder="City" required />

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

        <div className="flex justify-end gap-x-3 bg-rich-black p-3">
          <Button isWhite onClick={handleCloseModal}>
            <MdClose className="icon" />
            Cancel
          </Button>
          <Button isGreen type="submit">
            {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
            {isUpdateForm ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default UpdateCreateInstructorForm;
