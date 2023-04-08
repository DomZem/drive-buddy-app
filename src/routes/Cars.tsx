import DetailsList, { type detailsList } from '@/components/molecules/DetailsList/DetailsList';
import DeleteItemModal from '@/components/organisms/DeleteItemModal/DeleteItemModal';
import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import UpdateCreateCarForm from '@/components/organisms/UpdateCreateCarForm/UpdateCreateCarForm';
import CardItem from '@/components/templates/CardItem/CardItem';
import Modal from '@/components/templates/Modal/Modal';
import useModal from '@/components/templates/Modal/userModa';
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
};

const Cars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [currentCar, setCurrentCar] = useState<CarType>(cars[0]);
  const [currentModal, setCurrentModal] = useState<ModalType>('update-create');

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
        fuel: doc.data().fuel,
        vin: doc.data().vin,
        registration: doc.data().registration,
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

  useEffect(() => {
    void getCars();
  }, []);

  return (
    <PageTemplate>
      <SearchCreateBar
        onHandleChange={() => console.log('hello!')}
        onHandleClick={() => handleOpenItem('update-create', initialFormValues)}
        placeHolderText="Search some cars by name ..."
      />
      {cars.length > 0 ? (
        <ul className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-3 lg:p-3 xl:grid-cols-3 2xl:grid-cols-4">
          {cars.map((car) => {
            const { mark, model, fuel, avatar, yearProduction, vin, registration, id } = car;

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
                value: yearProduction,
              },
            ];

            return (
              <CardItem
                title={`${mark} ${model}`}
                imageSrc={avatar}
                handleDeleteCardItem={() => handleOpenItem('delete', car)}
                handleUpdateCardItem={() => handleOpenItem('update-create', car)}
                key={id}
              >
                <DetailsList list={detailsList} />
              </CardItem>
            );
          })}
        </ul>
      ) : null}

      <Modal isOpen={isOpen} handleClose={handleCloseModal}>
        {currentModal === 'delete' && (
          <DeleteItemModal
            handleCloseModal={handleCloseModal}
            handleDeleteItem={handleDeleteCar}
            boldText={` ${currentCar.mark} ${currentCar.model}`}
          />
        )}
        {currentModal === 'update-create' && (
          <UpdateCreateCarForm formValues={currentCar} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </PageTemplate>
  );
};

export default Cars;
