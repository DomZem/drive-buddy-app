import userImg from '@/assets/img/user.jpg';
import { BiCategory, BiShow } from 'react-icons/bi';
import { BsPhoneFill } from 'react-icons/bs';
import { MdDelete, MdOutlinePhoneAndroid } from 'react-icons/md';

const Instructors = () => (
  <div className="mx-auto max-w-7xl">
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3 md:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] md:gap-4">
      <li className="flex flex-col">
        <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-white p-3">
          <div className="flex items-center gap-3 md:flex-col">
            <img className="h-12 w-12 rounded-full md:h-20 md:w-20" src={userImg} alt="dominik zemlik profile" />
            <h2 className="font-semibold md:text-lg">Luke Skywalker</h2>
          </div>
          <ul className="flex flex-col items-start gap-y-3">
            <li className="flex items-center gap-x-2 text-xs md:text-sm">
              <BiCategory className="text-base md:text-xl" />
              Licences - A1, A2, A, B1, B2, C+E
            </li>
            <li className="flex items-center gap-x-2 text-xs md:text-sm">
              <BsPhoneFill className="text-base md:text-xl" />
              492 483 023
            </li>
          </ul>
        </div>
        <div className="flex">
          <button className="flex flex-1 items-center justify-center gap-x-2 rounded-bl-lg bg-rich-black p-2 text-xs font-medium text-white duration-200 hover:bg-[#000605] md:p-3 md:text-sm">
            <BiShow className="text-base md:text-xl" />
            View
          </button>
          <button className="flex flex-1 items-center justify-center gap-x-2 rounded-br-lg bg-red p-2 text-xs font-medium text-white duration-200 hover:bg-[#ba0404] md:p-3 md:text-sm">
            <MdDelete className="text-base md:text-xl" />
            Delete
          </button>
        </div>
      </li>

      <li className="flex flex-col">
        <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-white p-3">
          <div className="flex items-center gap-3 md:flex-col">
            <img className="h-12 w-12 rounded-full md:h-20 md:w-20" src={userImg} alt="dominik zemlik profile" />
            <h2 className="font-semibold md:text-lg">Anakin Skywalker</h2>
          </div>
          <ul className="flex flex-col items-start gap-y-3">
            <li className="flex items-center gap-x-2 text-xs md:text-sm">
              <BiCategory className="text-base md:text-xl" />
              Licences - A1, A2, A, B1, B2, C+E
            </li>
            <li className="flex items-center gap-x-2 text-xs md:text-sm">
              <MdOutlinePhoneAndroid className="text-base md:text-xl" />
              823 383 922
            </li>
          </ul>
        </div>
        <div className="flex">
          <button className="flex flex-1 items-center justify-center gap-x-2 rounded-bl-lg bg-rich-black p-2 text-xs font-medium text-white duration-200 hover:bg-[#000605] md:p-3 md:text-sm">
            <BiShow className="text-base md:text-xl" />
            View
          </button>
          <button className="flex flex-1 items-center justify-center gap-x-2 rounded-br-lg bg-red p-2 text-xs font-medium text-white duration-200 hover:bg-[#ba0404] md:p-3 md:text-sm">
            <MdDelete className="text-base md:text-xl" />
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
);

export default Instructors;
