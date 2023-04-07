import Logo from '@/components/atoms/Logo/Logo';

const SidebarHeader = () => (
  <header className="flex h-[3.5rem] items-center gap-x-3 bg-rich-black p-2 lg:h-[4rem] lg:p-3">
    <Logo />
    <h1 className="hidden text-xl font-semibold text-white lg:block lg:text-2xl">Drive buddy</h1>
  </header>
);

export default SidebarHeader;
