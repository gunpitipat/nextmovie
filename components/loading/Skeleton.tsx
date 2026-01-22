interface SkeletonProps {
  className: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`${className} bg-surface-2 relative overflow-hidden opacity-60`}
    >
      <div className="via-surface-3 animate-shimmer absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
    </div>
  );
};

export default Skeleton;
