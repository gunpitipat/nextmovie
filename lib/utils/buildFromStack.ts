export const DELIMITER = '::';

// Build a stacked `from` param for nested navigation between detail pages
export function buildFromStack(
  base: string,
  currentFrom?: string | null
): string {
  return currentFrom?.startsWith('/')
    ? `${base}${DELIMITER}${currentFrom}`
    : base;
}
