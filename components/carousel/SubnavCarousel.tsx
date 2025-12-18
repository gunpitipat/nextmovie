'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { WheelControls } from './plugins/wheel-controls';
import type { KeenSliderOptions, KeenSliderPlugin } from 'keen-slider';

const SubnavCarousel = ({ children }: { children: React.ReactNode }) => {
  const options: KeenSliderOptions = {
    dragSpeed: 0.75,
    mode: 'free',
    rubberband: false,
    slides: { perView: 'auto', spacing: 16 },
  };

  const plugins: KeenSliderPlugin[] = [WheelControls];

  const [sliderRef] = useKeenSlider<HTMLDivElement>(options, plugins);

  return (
    <div ref={sliderRef} className="keen-slider">
      {children}
    </div>
  );
};

export default SubnavCarousel;
