import DetailsList, { type detailsList } from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import UpdateCreateCarForm from '@/components/organisms/UpdateCreateCarForm/UpdateCreateCarForm';
import CardItemTemplate from '@/components/templates/CardItemTemplate/CardItemTemplate';

import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/useModal';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';
import { db } from '@/firebase/config';
import { type CarType, type ModalType } from '@/types';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { GiFuelTank, GiKeyCard } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import { RxIdCard } from 'react-icons/rx';

const initialFormValues: CarType = {
  id: '',
  mark: '',
  model: '',
  avatar: '',
  fuel: '',
  vin: '',
  registration: '',
  yearProduction: '',
  courseCategory: '',
  reviewDate: new Date(),
};

const Cars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [currentCar, setCurrentCar] = useState<CarType>(cars[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');

  const [filterByName, setFilterByName] = useState('');
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);

  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const carsCollectionRef = collection(db, 'cars');

  const getCars = async () => {
    const data = await getDocs(carsCollectionRef);
    setCars(
      data.docs.map((doc) => ({
        id: doc.id,
        mark: doc.data().mark,
        model: doc.data().model,
        avatar: doc.data().avatar,
        yearProduction: doc.data().yearProduction,
        reviewDate: doc.data().reviewDate,
        fuel: doc.data().fuel,
        vin: doc.data().vin,
        registration: doc.data().registration,
        courseCategory: doc.data().courseCategory,
      }))
    );
  };

  const handleOpenItem = (modal: ModalType, currentItem: CarType) => {
    if (modal === 'delete') {
      setCurrentModal('delete');
    } else {
      setCurrentModal('update-create');
    }
    setCurrentCar(currentItem);
    handleOpenModal();
  };

  const handleDeleteCar = async () => {
    const carDoc = doc(db, 'cars', currentCar.id);
    await deleteDoc(carDoc);
    void getCars();
    handleCloseModal();
  };

  const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByName(e.target.value);
  };

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const carMarkName = car.mark.toLowerCase();
      const carModelName = car.model.toLowerCase();

      return `${carMarkName} ${carModelName}`.includes(filterByName.toLowerCase());
    });
    setFilteredCars(filtered);
  }, [filterByName, cars]);

  useEffect(() => {
    void getCars();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onInputChange={handleFilterName}
        onCreateItem={() => handleOpenItem('update-create', initialFormValues)}
        placeHolderText="Search some cars by name ..."
      />
      {filteredCars.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredCars.map((car) => {
            const { mark, model, fuel, avatar, reviewDate, vin, registration, id } = car;

            const detailsList: detailsList = [
              {
                icon: RxIdCard,
                value: vin,
              },
              {
                icon: GiKeyCard,
                value: registration,
              },
              {
                icon: GiFuelTank,
                value: fuel,
              },
              {
                icon: MdDateRange,
                value: reviewDate,
              },
            ];

            return (
              <CardItemTemplate
                title={`${mark} ${model}`}
                imageSrc={avatar}
                onDeleteItem={() => handleOpenItem('delete', car)}
                onUpdateItem={() => handleOpenItem('update-create', car)}
                key={id}
              >
                <DetailsList list={detailsList} />
              </CardItemTemplate>
            );
          })}
        </ul>
      ) : null}

      <Modal isOpen={isOpen} onCloseModal={handleCloseModal}>
        {currentModal === 'delete' && (
          <DeleteItemModal
            onCloseModal={handleCloseModal}
            onDeleteItem={handleDeleteCar}
            boldText={` ${currentCar.mark} ${currentCar.model}`}
          />
        )}

        {currentModal === 'update-create' && (
          <UpdateCreateCarForm formValues={currentCar} onCloseModal={handleCloseModal} />
        )}
      </Modal>
    </PageTemplate>
  );
};

export default Cars;
