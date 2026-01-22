interface ThreeDotsProps {
  className?: string;
}

const ThreeDots = ({ className }: ThreeDotsProps) => {
  return (
    <div
      className={`${className ?? ''} flex items-center justify-center gap-1`}
    >
      <div className="bg-secondary size-2 animate-pulse rounded-full" />
      <div className="bg-secondary size-2 animate-pulse rounded-full [animation-delay:300ms]" />
      <div className="bg-secondary size-2 animate-pulse rounded-full [animation-delay:600ms]" />
    </div>
  );
};

export default ThreeDots;
