/* 2000-10-18 -> 2000 */
export function formatReleaseYear(date: string | null): string {
  if (!date) return '';

  return new Date(date).getFullYear().toString();
}

/* 2000-10-18 -> Oct 18, 2000 */
export function formatDateShort(date: string | null): string {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// 2000-10-18 -> October 18, 2000
export function formatDateLong(date: string | null): string {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
