import { db, storage } from '@/firebase/config';
import { type InstructorType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdClose, MdCloudUpload, MdUpdate } from 'react-icons/md';

interface CreateInstructorFormProps {
  handleCloseModal: () => void;
}

const initialFormValues = {
  id: '',
  firstName: '',
  lastName: '',
  city: '',
  avatar: '',
  phone: '',
  email: '',
  license: '',
};

const CreateInstructorForm: FC<CreateInstructorFormProps> = ({ handleCloseModal }) => {
  const [file, setFile] = useState(initialFormValues.avatar);

  const handleCreateInstructor = async (values: InstructorType, { setSubmitting }: FormikHelpers<InstructorType>) => {
    try {
      await addDoc(collection(db, 'instructors'), { ...values, avatar: file });
      setFile('');
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
    handleCloseModal();
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
    <Formik initialValues={initialFormValues} onSubmit={handleCreateInstructor}>
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

        <div className="grid grid-cols-2 gap-3 bg-slate-gray p-3">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-rich-black">
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-rich-black">
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
              placeholder="Skywalker"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-rich-black">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
              placeholder="anakinskywalker@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-rich-black">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
              placeholder="m#P52s@ap$V"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-rich-black">
              Phone
            </label>
            <Field
              id="phone"
              name="phone"
              className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
              placeholder="238-239-234"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium text-rich-black">
              City
            </label>
            <Field
              id="city"
              name="city"
              className="block w-full rounded-lg bg-white p-2 text-sm text-rich-black outline-none"
              placeholder="Los Angeles"
              required
            />
          </div>

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
          <button
            className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-white p-2 text-xs font-medium text-rich-black duration-200 hover:bg-[#ddd] lg:text-sm"
            onClick={handleCloseModal}
          >
            <MdClose className="text-base md:text-xl" />
            Cancel
          </button>
          <button
            className="bg-red inline-flex items-center justify-center gap-x-2 rounded-lg bg-green-600 p-2 text-xs font-medium text-white duration-200 hover:bg-green-700 lg:text-sm"
            type="submit"
          >
            <MdUpdate className="text-base md:text-xl" />
            Create
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateInstructorForm;
