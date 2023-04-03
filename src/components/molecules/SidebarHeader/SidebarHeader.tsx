import { GiCarSeat } from 'react-icons/gi';

const SidebarHeader = () => (
  <header className="flex h-[3.5rem] items-center justify-center gap-x-3 bg-rich-black p-2 lg:h-[4rem] lg:justify-start lg:p-3">
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-blue-600 lg:w-10">
      <GiCarSeat className="text-2xl text-white lg:text-3xl" />
    </div>
    <h1 className="hidden text-2xl font-semibold text-white lg:block">Drive buddy</h1>
  </header>
);

export default SidebarHeader;
