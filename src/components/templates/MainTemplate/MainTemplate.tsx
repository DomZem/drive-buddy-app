import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import { type FC } from 'react';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className="grid grid-cols-[3.5rem_1fr] grid-rows-[3.5rem_1fr] w-full h-screen">
    <Sidebar />
    {children}
  </div>
);

export default MainTemplate;
