export function filterPosterSlides<T extends { poster_path: string | null }>(
  items: T[]
): (T & { poster_path: string })[] {
  return items.filter(
    (item): item is T & { poster_path: string } => !!item.poster_path
  );
}
