import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import SelectField from '@/components/atoms/SelectField/SelectField';
import FormTemplate from '@/components/templates/FormTemplate/FormTemplate';
import { db, storage } from '@/firebase/config';
import { type CarType } from '@/types';
import { categoryYup, nameYup } from '@/utility/yup';
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Formik } from 'formik';
import { useState, type FC } from 'react';
import toast from 'react-hot-toast';
import { MdPersonAddAlt1, MdUpdate } from 'react-icons/md';
import * as Yup from 'yup';

interface UpdateCreateCarFormProps {
  formValues: CarType;
  onCloseModal: () => void;
}

const fuels = ['Petrol', 'Electric', 'Petrol+Gas', 'Diesel', 'Hybrid'];

const CarSchema = Yup.object({
  mark: nameYup('Mark'),
  model: Yup.string().required('Required'),
  vin: Yup.string()
    .matches(
      /^[A-HJ-NPR-Z0-9]{17}$/,
      'VIN must be exactly 17 characters long and can only contain uppercase letters (except I, O, Q), and numbers'
    )
    .required('Required'),
  registration: Yup.string()
    .matches(
      /^[A-Za-z0-9]{5,10}$/,
      'Car registration number must be between 5 and 10 characters and can only contain letters and numbers'
    )
    .required('Required'),
  yearProduction: Yup.number()
    .integer('Year must be an integer')
    .min(1000, 'Year must be at least 4 digits long')
    .required('Required'),
  courseCategory: categoryYup('Course category'),
});

const UpdateCreateCarForm: FC<UpdateCreateCarFormProps> = ({ formValues, onCloseModal }) => {
  const [file, setFile] = useState(formValues.avatar);

  // When there is an ID in formValues we have already created user and we want update data. When the ID is empty we want to create user.
  const isUpdateForm = formValues.id.length > 0;

  const handleCreateCar = async (values: CarType) => {
    try {
      await addDoc(collection(db, 'cars'), { ...values, avatar: file, id: faker.datatype.uuid() });
      setFile('');
      toast.success('The Car has been created');
    } catch (e) {
      toast.error('Something went wrong. The Car has not been added');
    } finally {
      onCloseModal();
    }
  };

  const handleUpdateCar = async (values: CarType) => {
    try {
      const carRef = doc(db, 'cars', formValues.id);
      await updateDoc(carRef, { ...values, avatar: file });
      toast.success('The Car has been updated');
    } catch (e) {
      toast.error('Something went wrong. The Car has not been updated');
    } finally {
      onCloseModal();
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file !== undefined) {
      const name = `cars/${file.name}`;

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
      onSubmit={isUpdateForm ? handleUpdateCar : handleCreateCar}
      validationSchema={CarSchema}
    >
      <FormTemplate file={file} onUploadImage={handleUploadImage} onCloseModal={onCloseModal}>
        <InputField id="mark" label="Mark" name="mark" />
        <InputField id="model" label="Model" name="model" />
        <InputField id="vin" label="Vin" name="vin" />
        <InputField id="registration" label="Registration" name="registration" />
        <SelectField id="fuel" label="Fuel" name="fuel" options={fuels} />
        <InputField id="yearProduction" label="Production year" name="yearProduction" />
        <InputField id="courseCategory" label="Course category" name="courseCategory" />
        <InputField id="reviewDate" label="Review data" name="reviewDate" type="date" />

        <Button isGreen type="submit">
          {isUpdateForm ? <MdUpdate className="icon" /> : <MdPersonAddAlt1 className="icon" />}
          {isUpdateForm ? 'Update' : 'Create'}
        </Button>
      </FormTemplate>
    </Formik>
  );
};

export default UpdateCreateCarForm;
