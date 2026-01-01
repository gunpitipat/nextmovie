interface OverviewProps {
  overview: string;
}

const Overview = ({ overview }: OverviewProps) => {
  return (
    <div className="px-content max-w-content w-full">
      <h2 className="heading heading-bar">Overview</h2>
      <p className="text-secondary mt-6 text-base">{overview}</p>
    </div>
  );
};

export default Overview;
