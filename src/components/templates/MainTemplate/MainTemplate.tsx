import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import { type FC } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => (
  <div className="grid h-screen grid-cols-[3.5rem_1fr] grid-rows-[3.5rem_1fr] text-sm text-rich-black lg:grid-cols-[18rem_1fr] lg:grid-rows-[4rem_1fr] lg:text-base">
    <Sidebar />
    <div className="row-start-1 row-end-2 flex h-full items-center justify-between gap-x-3 bg-rich-black p-2 lg:p-3">
      <input
        className="w-full max-w-md rounded-lg px-2 py-1.5 text-xs text-rich-black outline-none lg:text-sm"
        type="text"
        placeholder="Search some users, cars..."
      />

      <button className="inline-flex items-center justify-center gap-x-2 rounded-full bg-blue-600 p-2 text-xs font-medium text-white duration-200 hover:bg-blue-700 lg:text-sm">
        <MdOutlineAdd className="text-base lg:text-xl" />
      </button>
    </div>
    <main className="overflow-y-auto bg-slate-gray">{children}</main>
  </div>
);

export default MainTemplate;
