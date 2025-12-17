'use client';

import { createContext, useContext, useState } from 'react';

const NotFoundContext = createContext<{
  isNotFound: boolean;
  setIsNotFound: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useNotFound = () => {
  const context = useContext(NotFoundContext);
  if (!context) {
    throw new Error('useNotFound must be used within NotFoundProvider');
  }
  return context;
};

export const NotFoundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
};
