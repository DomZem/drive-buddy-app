import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';

const Students = () => (
  <PageTemplate>
    <SearchCreateBar
      onHandleChange={() => console.log('hello!')}
      onHandleClick={() => console.log('hello!')}
      placeHolderText="Search some students by name ..."
    />
    <div>Hello from Students page!</div>
  </PageTemplate>
);

export default Students;
