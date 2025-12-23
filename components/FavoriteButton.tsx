'use client';

import { FaPlus } from 'react-icons/fa';

interface FavoriteButtonProps {
  className?: string;
  withIcon?: boolean;
}

const FavoriteButton = ({
  className,
  withIcon = false,
}: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 ${className ?? ''}`}
    >
      {withIcon && <FaPlus />}
      <span>Add to Favorites</span>
    </button>
  );
};

export default FavoriteButton;
