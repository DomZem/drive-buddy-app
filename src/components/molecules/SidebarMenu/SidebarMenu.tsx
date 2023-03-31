import { FaCarAlt, FaUser, FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const menus = [
  {
    title: 'Lessons',
    icon: GiTeacher,
  },
  {
    title: 'Instructors',
    icon: FaUserTie,
  },
  {
    title: 'Students',
    icon: FaUser,
  },
  {
    title: 'Cars',
    icon: FaCarAlt,
  },
];

const SidebarMenu = () => (
  <nav className="flex-1 bg-onyx p-2 md:p-3 flex flex-col gap-y-2 md:gap-y-3">
    {menus.map((menu) => (
      <NavLink
        className="cursor-pointer rounded-lg md:h-[auto] font-medium text-silver duration-200 hover:bg-rich-black hover:text-white h-[2.5rem] flex justify-center items-center md:justify-start md:p-3 md:gap-x-3"
        to={menu.title.toLowerCase()}
        key={menu.title}
      >
        <menu.icon className="text-xl md:text-2xl" />
        <p className="hidden md:block">{menu.title}</p>
      </NavLink>
    ))}

    <a
      className="cursor-pointer rounded-lg font-medium text-silver duration-200 hover:bg-rich-black hover:text-white h-[2.5rem] flex justify-center items-center md:justify-start md:p-3 md:gap-x-3"
      href="#"
    >
      <FiLogOut className="text-xl md:text-2xl" />
      <p className="hidden md:block">Logout</p>
    </a>
  </nav>
);

export default SidebarMenu;
