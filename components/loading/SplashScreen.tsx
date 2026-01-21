import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className="bg-background fixed inset-0 z-9999 flex touch-none items-center justify-center">
      <Image
        src="/images/nextmovie-logo.png"
        alt="Nextmovie logo"
        width={48}
        height={48}
        draggable={false}
      />
    </div>
  );
};

export default SplashScreen;
