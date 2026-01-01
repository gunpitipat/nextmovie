import type { Video } from '@/types';

export function getTrailers(videos: Video[]): Video[] {
  const trailers = videos
    .filter(
      (video) =>
        video.site === 'YouTube' && video.type === 'Trailer' && video.official
    )
    .toSorted(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime() // Newest first
    );

  // TMDB has many videos with type === 'Teaser' (ads, reviews, promos).
  // The main teaser trailer may not be marked as type === 'Trailer'.
  // So, pick only the earliest matched one below, if any.
  const teaser = videos
    .filter(
      (video) =>
        video.site === 'YouTube' &&
        video.type === 'Teaser' &&
        video.official &&
        (/(official\s*)?(teaser\s*trailer|trailer\s*teaser)$/i.test(
          video.name
        ) ||
          /^official\s*(teaser|trailer)$/i.test(video.name)) &&
        !/now\s*playing|in\s*theaters|on\s*sale|tickets?|online\s*now/i.test(
          video.name
        )
    )
    .toSorted(
      (a, b) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    )[0];

  return teaser ? [...trailers, teaser] : trailers;
}
