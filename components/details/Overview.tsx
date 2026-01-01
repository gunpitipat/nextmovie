interface OverviewProps {
  overview: string;
}

const Overview = ({ overview }: OverviewProps) => {
  return (
    <div className="px-content max-w-content w-full">
      <h2 className="heading">Overview</h2>
      <p className="text-secondary mt-5 text-base">{overview}</p>
    </div>
  );
};

export default Overview;
