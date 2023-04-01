import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import { type FC } from 'react';
import { HiSearch } from 'react-icons/hi';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className="grid h-screen grid-cols-[3.5rem_1fr] grid-rows-[3.5rem_1fr] text-sm text-rich-black md:grid-cols-[18rem_1fr] md:grid-rows-[4rem_1fr] md:text-base">
    <Sidebar />
    <div className="row-start-1 row-end-2 flex h-full items-center gap-x-2 p-2 md:p-3">
      <div className="flex flex-1 items-center gap-x-2">
        <HiSearch className="text-3xl" />
        <input
          className="w-full max-w-lg px-2 py-1.5 text-xs text-rich-black md:text-sm"
          type="text"
          placeholder="Search some users, cars..."
        />
      </div>
    </div>
    <main className="overflow-y-auto bg-slate-gray p-2 md:p-4">{children}</main>
  </div>
);

export default MainTemplate;
