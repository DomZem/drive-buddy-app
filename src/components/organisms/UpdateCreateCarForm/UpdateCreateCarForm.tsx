import Button from '@/components/atoms/Button/Button';
import FormField from '@/components/molecules/FormField/FormField';
import { db, storage } from '@/firebase/config';
import { type CarType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdClose, MdCloudUpload, MdPersonAddAlt1, MdUpdate } from 'react-icons/md';

interface UpdateCreateCarFormProps {
  formValues: CarType;
  handleCloseModal: () => void;
}

const UpdateCreateCarForm: FC<UpdateCreateCarFormProps> = ({ formValues, handleCloseModal }) => {
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateCar = async (values: CarType, { setSubmitting }: FormikHelpers<CarType>) => {
    try {
      await addDoc(collection(db, 'cars'), { ...values, avatar: file, id: faker.datatype.uuid() });
      setFile('');
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      handleCloseModal();
    }
  };

  const handleUpdateCar = async (values: CarType, { setSubmitting }: FormikHelpers<CarType>) => {
    try {
      const carRef = doc(db, 'cars', formValues.id);
      await updateDoc(carRef, { ...values, avatar: file });
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
    <Formik initialValues={formValues} onSubmit={isUpdateForm ? handleUpdateCar : handleCreateCar}>
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
          <FormField label="Mark" id="mark" name="mark" type="text" placeholder="Mark" required />
          <FormField label="Model" id="model" name="model" type="text" placeholder="Model" required />
          <FormField label="Vin" id="vin" name="vin" type="text" placeholder="Vin" required />
          <FormField
            label="Registration"
            id="registration"
            name="registration"
            type="text"
            placeholder="Registration"
            required
          />
          <FormField label="Fuel" id="fuel" name="fuel" type="text" placeholder="Fuel" required />
          <FormField
            label="Production year"
            id="yearProduction"
            name="yearProduction"
            type="text"
            placeholder="Production year"
            required
          />

          <div className="col-span-full">
            <label htmlFor="courseCategory" className="mb-2 block text-sm font-medium text-rich-black">
              Course category
            </label>
            <Field
              id="courseCategory"
              name="courseCategory"
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

export default UpdateCreateCarForm;
