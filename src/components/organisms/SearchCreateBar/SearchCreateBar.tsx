import { type FC } from 'react';

interface SearchCreateBarProps {
  placeHolderText: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleClick: () => void;
}

const SearchCreateBar: FC<SearchCreateBarProps> = ({ placeHolderText, onHandleChange, onHandleClick }) => (
  <div className="fixed left-[3.5rem] right-0 top-0 flex h-[3.5rem] items-center justify-start gap-x-3 bg-rich-black p-2 lg:left-[18rem] lg:h-[4rem] lg:p-3">
    <input
      type="text"
      className="block w-full max-w-lg rounded-lg border p-2 text-gray-900 outline-none"
      placeholder={placeHolderText}
      onChange={onHandleChange}
    />
    <button
      className="fixed right-0 top-16 rounded-l-lg bg-blue-600 p-2 text-xs font-medium text-white duration-200 hover:bg-blue-700 lg:top-[4.75rem] lg:text-sm"
      onClick={onHandleClick}
    >
      Create
    </button>
  </div>
);

export default SearchCreateBar;
