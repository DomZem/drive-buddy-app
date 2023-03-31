import { GiCarSeat } from 'react-icons/gi';

const SidebarHeader = () => (
  <header className="bg-rich-black h-[3.5rem] flex justify-center items-center p-2">
    <div className="rounded-lg bg-blue w-full h-full flex justify-center items-center">
      <GiCarSeat className="text-2xl text-white md:text-3xl" />
    </div>
  </header>
);

export default SidebarHeader;
