import Image from 'next/image';
import { HiMiniUser } from 'react-icons/hi2';

interface CastCardProps {
  name: string;
  character: string;
  episodeCount?: number;
  profilePath: string | null;
  imageBaseUrl: string;
}

const CastCard = ({
  name,
  character,
  episodeCount,
  profilePath,
  imageBaseUrl,
}: CastCardProps) => {
  const profileUrl = profilePath ? `${imageBaseUrl}w342${profilePath}` : null;

  return (
    <div className="keen-slider__slide keen-slide-w-fit carousel-px-content">
      <div className="h-full w-40 lg:w-[175px]">
        <div className="relative aspect-square w-full overflow-hidden rounded-full">
          {profileUrl ? (
            <Image
              src={profileUrl}
              alt={name}
              fill
              sizes="(max-width: 1023px) 160px, 175px"
              className="block object-cover object-[50%_25%]"
            />
          ) : (
            <div className="bg-surface-1 flex size-full items-center justify-center">
              <HiMiniUser className="text-muted/50 size-24 lg:size-26" />
            </div>
          )}
        </div>

        <div className="mt-2.5 flex flex-col gap-1 text-center">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-muted line-clamp-1 text-sm font-medium">
            {character}
          </p>
          {episodeCount && episodeCount > 0 && (
            <p className="text-muted text-sm">
              ({episodeCount} episode{episodeCount === 1 ? '' : 's'})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastCard;
