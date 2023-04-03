import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import { type FC } from 'react';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className="grid h-screen grid-cols-[3.5rem_1fr] text-sm text-rich-black lg:grid-cols-[18rem_1fr] lg:text-base">
    <Sidebar />
    <main className="col-start-2 col-end-3 overflow-y-auto bg-slate-gray">{children}</main>
  </div>
);

export default MainTemplate;
