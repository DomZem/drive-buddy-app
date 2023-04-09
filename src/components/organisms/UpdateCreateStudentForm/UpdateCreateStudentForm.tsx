import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import SelectField from '@/components/atoms/SelectField/SelectField';
import { courseCategories } from '@/constants';
import { db, storage } from '@/firebase/config';
import { type StudentType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdClose, MdCloudUpload, MdPersonAddAlt1, MdUpdate } from 'react-icons/md';
interface UpdateCreateStudentFormProps {
  formValues: StudentType;
  handleCloseModal: () => void;
}

const UpdateCreateStudentForm: FC<UpdateCreateStudentFormProps> = ({ formValues, handleCloseModal }) => {
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateStudent = async (values: StudentType, { setSubmitting }: FormikHelpers<StudentType>) => {
    try {
      await addDoc(collection(db, 'students'), { ...values, avatar: file, id: faker.datatype.uuid() });
      setFile('');
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      handleCloseModal();
    }
  };

  const handleUpdateStudent = async (values: StudentType, { setSubmitting }: FormikHelpers<StudentType>) => {
    try {
      const studentRef = doc(db, 'students', formValues.id);
      await updateDoc(studentRef, { ...values, avatar: file });
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
    <Formik initialValues={formValues} onSubmit={isUpdateForm ? handleUpdateStudent : handleCreateStudent}>
      <Form>
        <div className="flex flex-col items-center justify-center gap-y-3 bg-rich-black p-4">
          <img
            className="h-14 w-14 rounded-full lg:h-24 lg:w-24"
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

        <div className="grid grid-cols-2 gap-3 bg-white p-4">
          <InputField id="firstName" label="First name" name="firstName" required />
          <InputField id="lastName" label="Last name" name="lastName" required />
          <InputField id="email" label="Email" name="email" required />
          <InputField id="password" label="Password" name="password" type="password" required />
          <InputField id="phone" label="Phone" name="phone" required />
          <InputField id="city" label="City" name="city" required />

          <SelectField id="courseCategory" label="Course category" name="courseCategory" options={courseCategories} />
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

export default UpdateCreateStudentForm;
