export function formatVoteCount(count: number): string {
  if (count < 1_000) return `${count}`;

  if (count < 1_000_000) return `${Math.round(count / 1_000)}k`;

  const millions = (count / 1_000_000).toFixed(1);
  return millions.endsWith('.0') ? `${millions.slice(0, -2)}M` : `${millions}M`;
}
