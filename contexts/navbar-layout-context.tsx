'use client';

import { createContext, useContext, useState } from 'react';

const NavbarLayoutContext = createContext<{
  hasSubnav: boolean;
  setHasSubnav: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useNavbarLayout = () => {
  const context = useContext(NavbarLayoutContext);
  if (!context) {
    throw new Error('useNavbarLayout must be used within NavbarLayoutProvider');
  }
  return context;
};

export const NavbarLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasSubnav, setHasSubnav] = useState(false);

  return (
    <NavbarLayoutContext.Provider value={{ hasSubnav, setHasSubnav }}>
      {children}
    </NavbarLayoutContext.Provider>
  );
};
