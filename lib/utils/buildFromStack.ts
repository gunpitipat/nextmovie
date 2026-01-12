export const DELIMITER = '::';

// Build a stacked `from` param for nested navigation between movie detail pages.
export function buildFromStack(
  pathname: string,
  currentFrom?: string | null
): string {
  return currentFrom?.startsWith('/')
    ? `${pathname}${DELIMITER}${currentFrom}`
    : pathname;
}
