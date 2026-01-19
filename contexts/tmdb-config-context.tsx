'use client';

import { createContext, useContext } from 'react';
import type { TMDBConfig } from '@/types';

const TMDBConfigContext = createContext<TMDBConfig | null>(null);

export const useTMDBConfig = () => {
  const context = useContext(TMDBConfigContext);
  if (!context) {
    throw new Error('useTMDBConfig must be used within TMDBConfigProvider');
  }
  return context;
};

export const TMDBConfigProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TMDBConfig;
}) => {
  return (
    <TMDBConfigContext.Provider value={value}>
      {children}
    </TMDBConfigContext.Provider>
  );
};
