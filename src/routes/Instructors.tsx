import userImg from '@/assets/img/user.jpg';
import { BiShow } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const Instructors = () => (
  <div className="max-w-5xl">
    <ul className="grid gap-3">
      <li>
        <div className="p-3 bg-white rounded-t-lg flex gap-x-3">
          <img className="w-11 h-11 rounded-full" src={userImg} alt="dominik zemlik profile" />
          <div className="flex flex-col gap-y-1">
            <h2 className="font-semibold">Dominik Zemlik</h2>
            <p className="text-xs">Licences - A, A1, B1, B2, B3</p>
          </div>
        </div>
        <div className="flex">
          <button className="flex-1 flex items-center justify-center gap-x-2 p-2 text-xs font-medium bg-rich-black text-white rounded-bl-lg">
            <BiShow className="text-base" /> View
          </button>
          <button className="flex-1 flex items-center justify-center gap-x-2 p-2 text-xs font-medium bg-red text-white rounded-br-lg">
            <MdDelete className="text-base" />
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
);

export default Instructors;
