interface DetailItemProps {
  label: string;
  value: string;
}

interface DetailsProps {
  releaseDate: string;
  status?: string;
  networks?: string[];
  originalLanguage: string;
  productionCountries: string[];
  productionCompanies: string[];
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="border-surface-2 flex gap-2.5 border-b pb-2">
      <h3 className="badge flex-none self-start px-2 py-px text-sm font-medium">
        {label}
      </h3>
      <p className="text-secondary my-0.5 text-sm">{value}</p>
    </div>
  );
};

const Details = ({
  releaseDate,
  status,
  networks,
  originalLanguage,
  productionCountries,
  productionCompanies,
}: DetailsProps) => {
  return (
    <div className="px-content max-w-content w-full">
      <h2 className="heading heading-bar">Details</h2>

      <div className="mt-6 flex flex-col gap-2">
        {releaseDate && <DetailItem label="Release date" value={releaseDate} />}

        {status && <DetailItem label="Status" value={status} />}

        {networks && networks.length > 0 && (
          <DetailItem label="Networks" value={networks.join(' • ')} />
        )}

        {originalLanguage && (
          <DetailItem label="Original language" value={originalLanguage} />
        )}

        {productionCountries.length > 0 && (
          <DetailItem
            label="Production countries"
            value={productionCountries.join(' • ')}
          />
        )}

        {productionCompanies.length > 0 && (
          <DetailItem
            label="Production companies"
            value={productionCompanies.join(' • ')}
          />
        )}
      </div>
    </div>
  );
};

export default Details;
