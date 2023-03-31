import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import { type FC } from 'react';
import { HiSearch } from 'react-icons/hi';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[20rem_1fr] md:grid-rows-[4rem_1fr] grid-rows-[3.5rem_1fr] h-screen text-sm md:text-base text-rich-black">
    <Sidebar />
    <div className="p-2 md:p-3 gap-x-2 row-start-1 row-end-2 h-full flex items-center">
      <div className="flex-1 flex gap-x-2 items-center">
        <HiSearch className="text-3xl" />
        <input
          className="py-1.5 px-2 text-xs md:text-sm max-w-lg w-full text-rich-black"
          type="text"
          placeholder="Search some users, cars..."
        />
      </div>
    </div>
    <main className="bg-silver p-6 overflow-y-auto">{children}</main>
  </div>
);

export default MainTemplate;
