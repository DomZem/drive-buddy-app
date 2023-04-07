import { type FC } from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => (
  <div className="mx-auto h-full w-full max-w-7xl pt-[3.5rem] lg:pt-[4rem]">{children}</div>
);

export default PageTemplate;
