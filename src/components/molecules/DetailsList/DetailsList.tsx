import { type FC } from 'react';
import { type IconType } from 'react-icons/lib';

export type detailsList = Array<{
  icon: IconType;
  value: string | number;
}>;

export interface DetailsListProps {
  list: detailsList;
}

const DetailsList: FC<DetailsListProps> = ({ list }) => (
  <ul className="flex flex-col items-start gap-y-3 font-medium">
    {list.map((item) => (
      <li className="flex items-center gap-x-2 font-medium" key={item.value}>
        <item.icon className="text-xl lg:text-2xl" />
        {item.value}
      </li>
    ))}
  </ul>
);

export default DetailsList;
