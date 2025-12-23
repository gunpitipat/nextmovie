export function formatRuntime(minutes: number): string {
  if (minutes === 0) return '';

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return h ? `${h}h ${m}m` : `${m}m`;
}
