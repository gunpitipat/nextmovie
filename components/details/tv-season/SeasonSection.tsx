import SeasonSelector from './SeasonSelector';

interface SeasonSectionProps {
  selectedSeason: number;
  seasonNumbers: number[];
}

const SeasonSection = ({
  selectedSeason,
  seasonNumbers,
}: SeasonSectionProps) => {
  return (
    <div className="px-content max-w-content w-full">
      <div className="flex items-center gap-1">
        <h2 className="heading heading-bar">Season</h2>
        <SeasonSelector
          selectedSeason={selectedSeason}
          seasonNumbers={seasonNumbers}
        />
      </div>
    </div>
  );
};

export default SeasonSection;
