import SearchCreateBar from '@/components/organisms/SearchCreateBar/SearchCreateBar';
import PageTemplate from '@/components/templates/PageTemplate/PageTemplate';

const Lessons = () => (
  <PageTemplate>
    <SearchCreateBar
      onHandleChange={() => console.log('hello!')}
      onHandleClick={() => console.log('hello!')}
      placeHolderText="Search some lessons by name ..."
    />
    <div>Hello from lessons page!</div>
  </PageTemplate>
);

export default Lessons;
