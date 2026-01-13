export function formatRuntime(minutes: number | null): string {
  if (minutes === 0 || minutes === null) return '';

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return h ? `${h}h ${m}m` : `${m}m`;
}
