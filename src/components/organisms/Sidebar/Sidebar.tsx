import SidebarHeader from '@/components/molecules/SidebarHeader/SidebarHeader';
import SidebarMenu from '@/components/molecules/SidebarMenu/SidebarMenu';

const Sidebar = () => (
  <aside className="col-start-1 col-end-2 flex flex-col">
    <SidebarHeader />
    <SidebarMenu />
  </aside>
);

export default Sidebar;
