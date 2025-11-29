'use client';

import { FaPlus } from 'react-icons/fa6';
import { GoBookmarkFill, GoBookmarkSlashFill } from 'react-icons/go';

const BookmarkButton = () => {
  return (
    <button
      type="button"
      className="absolute top-0 right-0 size-12 opacity-80 transition-[filter] duration-200 ease-in-out hover:brightness-150"
    >
      <div className="absolute top-px -right-1 size-11 lg:size-12">
        <GoBookmarkFill className="text-surface-2 size-full" />
        <FaPlus className="text-highlight absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-[80%]" />
      </div>
    </button>
  );
};

export default BookmarkButton;
