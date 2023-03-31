import MainTemplate from '@/components/templates/MainTemplate/MainTemplate';
import { Outlet } from 'react-router';

const Root = () => (
  <MainTemplate>
    <Outlet />
  </MainTemplate>
);

export default Root;
