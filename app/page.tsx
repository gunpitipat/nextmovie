import { getTMDBConfig, getTrendingAll } from '@/lib/tmdb';
import Hero from '@/components/home/Hero';

export default async function Home() {
  const [config, trending] = await Promise.all([
    getTMDBConfig(),
    getTrendingAll(),
  ]);

  const heroMovie = trending.results.find(
    (media) =>
      media.media_type === 'movie' && media.poster_path && media.backdrop_path
  );

  const heroTV = trending.results.find(
    (media) =>
      media.media_type === 'tv' && media.poster_path && media.backdrop_path
  );

  if (!heroMovie && !heroTV) {
    throw new Error('No suitable trending media found for Hero sections.');
  }

  return (
    <section>
      {heroMovie && <Hero media={heroMovie} config={config} priority />}
    </section>
  );
}
