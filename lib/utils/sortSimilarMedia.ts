export function sortSimilarMedia<
  T extends { vote_average: number; vote_count: number },
>(media: T[]): T[] {
  return media.toSorted((a, b) => {
    const scoreA = a.vote_average * Math.log10(a.vote_count + 1);
    const scoreB = b.vote_average * Math.log10(b.vote_count + 1);
    return scoreB - scoreA;
  });
}
