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
  <nav className="flex flex-1 flex-col gap-y-2 bg-onyx p-2 lg:gap-y-3 lg:p-3">
    {menus.map((menu) => (
      <NavLink
        className="flex h-[2.5rem] cursor-pointer items-center justify-center rounded-lg font-medium text-silver duration-200 hover:bg-rich-black hover:text-white lg:h-[auto] lg:justify-start lg:gap-x-3 lg:p-3"
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? '#111827' : '',
            color: isActive ? 'white' : '',
          };
        }}
        to={menu.title.toLowerCase()}
        key={menu.title}
      >
        <menu.icon className="text-xl lg:text-2xl" />
        <p className="hidden lg:block">{menu.title}</p>
      </NavLink>
    ))}

    <a
      className="flex h-[2.5rem] cursor-pointer items-center justify-center rounded-lg font-medium text-silver duration-200 hover:bg-rich-black hover:text-white lg:h-[auto] lg:justify-start lg:gap-x-3 lg:p-3"
      href="#"
    >
      <FiLogOut className="text-xl lg:text-2xl" />
      <p className="hidden lg:block">Logout</p>
    </a>
  </nav>
);

export default SidebarMenu;
