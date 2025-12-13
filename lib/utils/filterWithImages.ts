export function filterWithImages<
  T extends { poster_path: string | null; backdrop_path: string | null },
>(items: T[]): (T & { poster_path: string; backdrop_path: string })[] {
  return items.filter(
    (item): item is T & { poster_path: string; backdrop_path: string } =>
      !!item.poster_path && !!item.backdrop_path
  );
}
