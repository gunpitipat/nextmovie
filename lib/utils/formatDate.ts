/* 2000-10-18 -> 2000 */
export function formatReleaseYear(date: string): string {
  if (!date) return '';

  return new Date(date).getFullYear().toString();
}

/* 2000-10-18T16:12:08.000 -> Oct 18, 2000 */
export function formatPublishedAt(date: string): string {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
