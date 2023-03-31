import { GiCarSeat } from 'react-icons/gi';

const SidebarHeader = () => (
  <header className="bg-rich-black h-[3.5rem] md:h-[4rem] flex justify-center items-center p-2 md:p-3 md:justify-start gap-x-3">
    <div className="rounded-lg bg-blue w-full h-full flex justify-center items-center md:w-10">
      <GiCarSeat className="text-2xl text-white md:text-3xl" />
    </div>
    <h1 className="text-white text-2xl font-semibold hidden md:block">Drive buddy</h1>
  </header>
);

export default SidebarHeader;
