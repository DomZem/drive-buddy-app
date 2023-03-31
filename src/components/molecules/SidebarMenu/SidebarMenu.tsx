import { FaCarAlt, FaUser, FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';

const menus = [
  {
    title: 'lessons',
    icon: GiTeacher,
  },
  {
    title: 'instructors',
    icon: FaUserTie,
  },
  {
    title: 'students',
    icon: FaUser,
  },
  {
    title: 'cars',
    icon: FaCarAlt,
  },
  {
    title: 'logout',
    icon: FiLogOut,
  },
];

const SidebarMenu = () => (
  <nav className="flex-1 bg-onyx p-2 flex flex-col gap-y-2">
    {menus.map((menu) => (
      <a
        className="cursor-pointer rounded-lg font-medium text-silver duration-200 hover:bg-rich-black hover:text-white h-[2.5rem] flex justify-center items-center"
        href="#"
        key={menu.title}
      >
        <menu.icon className="text-xl md:text-2xl" />
      </a>
    ))}
  </nav>
);

export default SidebarMenu;
