'use client';

import { useEffect, useState } from 'react';

// Prevent hydration mismatch for client-only or DOM-dependent usage
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  return mounted;
}
