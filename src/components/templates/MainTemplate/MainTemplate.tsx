import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import { type FC } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
// import { HiSearch } from 'react-icons/hi';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className="grid h-screen grid-cols-[3.5rem_1fr] grid-rows-[3.5rem_1fr] text-sm text-rich-black md:grid-cols-[18rem_1fr] md:grid-rows-[4rem_1fr] md:text-base">
    <Sidebar />
    <div className="row-start-1 row-end-2 flex h-full items-center justify-between gap-x-3 bg-rich-black p-2 md:p-3">
      <input
        className="w-full max-w-sm rounded-lg px-2 py-1.5 text-xs text-rich-black md:text-sm"
        type="text"
        placeholder="Search some users, cars..."
      />

      <button className="inline-flex items-center justify-center gap-x-2 rounded-full bg-blue p-2 text-xs font-medium text-white duration-200 md:text-sm">
        <MdOutlineAdd className="text-base md:text-xl" />
      </button>
    </div>
    <main className="overflow-y-auto bg-slate-gray">{children}</main>
  </div>
);

export default MainTemplate;
