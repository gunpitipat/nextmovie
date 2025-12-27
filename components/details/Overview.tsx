interface OverviewProps {
  overview: string;
}

const Overview = ({ overview }: OverviewProps) => {
  return (
    <div className="px-content w-full max-w-7xl">
      <h2 className="heading">Overview</h2>
      <p className="text-secondary mt-5 text-base">{overview}</p>
    </div>
  );
};

export default Overview;
