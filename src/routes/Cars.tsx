import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';

const Cars = () => (
  <PageTemplate>
    <SearchCreateBar
      onHandleChange={() => console.log('hello!')}
      onHandleClick={() => console.log('hello!')}
      placeHolderText="Search some cars by name ..."
    />
    <div>Hello from cars page!</div>
  </PageTemplate>
);

export default Cars;
