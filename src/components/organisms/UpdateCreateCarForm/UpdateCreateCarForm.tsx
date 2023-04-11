import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import SelectField from '@/components/atoms/SelectField/SelectField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { courseCategories } from '@/constants';
import { db, storage } from '@/firebase/config';
import { type CarType } from '@/types';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Formik, type FormikHelpers } from 'formik';
import { useState, type FC } from 'react';
import { MdPersonAddAlt1, MdUpdate } from 'react-icons/md';

interface UpdateCreateCarFormProps {
  formValues: CarType;
  onCloseModal: () => void;
}

const fuels = ['Electric', 'Petrol', 'Gas', 'Hybrid'];

const UpdateCreateCarForm: FC<UpdateCreateCarFormProps> = ({ formValues, onCloseModal }) => {
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
      onCloseModal();
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
    <Formik initialValues={formValues} onSubmit={isUpdateForm ? handleUpdateCar : handleCreateCar}>
      <FormTemplate file={file} onUploadImage={handleUploadImage} onCloseModal={onCloseModal}>
        <InputField id="mark" label="Mark" name="mark" required />
        <InputField id="model" label="Model" name="model" required />
        <InputField id="vin" label="Vin" name="vin" required />
        <InputField id="registration" label="Registration" name="registration" required />
        <SelectField id="fuel" label="Fuel" name="fuel" options={fuels} />
        <InputField id="yearProduction" label="Production year" name="yearProduction" required />
        <SelectField id="courseCategory" label="Course category" name="courseCategory" options={courseCategories} />

        <Button isGreen type="submit">
          {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
          {isUpdateForm ? 'Update' : 'Create'}
        </Button>
      </FormTemplate>
    </Formik>
  );
};

export default UpdateCreateCarForm;
