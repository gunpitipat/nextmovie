'use client';

import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'keen-slider/keen-slider.min.css';
import { WheelControls } from './plugins/wheel-controls';
import type {
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider';

interface MediaCarouselProps {
  children: React.ReactNode;
}

const MediaCarousel = ({ children }: MediaCarouselProps) => {
  const [slidesPerView, setSlidesPerView] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [minIdx, setMinIdx] = useState(0);
  const [maxIdx, setMaxIdx] = useState(0);

  const updateSlidesPerView = (slider: KeenSliderInstance) => {
    const perView = slider.track.details.slides.filter(
      (slide) => slide.portion >= 0.99
    ).length;
    setSlidesPerView(perView);
  };

  const options: KeenSliderOptions = {
    initial: 0,
    dragSpeed: 0.75,
    mode: 'free',
    rubberband: false,
    slides: { perView: 'auto', spacing: 8 },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 'auto', spacing: 12 } },
      '(min-width: 1024px)': {
        mode: 'free-snap',
        slides: { perView: 'auto', spacing: 16 },
      },
    },
    created(slider) {
      updateSlidesPerView(slider);
      setCurrentIdx(0);
      setMinIdx(slider.track.details.minIdx);
      setMaxIdx(slider.track.details.maxIdx);
    },
    updated(slider) {
      updateSlidesPerView(slider);
      setCurrentIdx(slider.track.details.abs);
      setMinIdx(slider.track.details.minIdx);
      setMaxIdx(slider.track.details.maxIdx);
    },
    slideChanged(slide) {
      setCurrentIdx(slide.track.details.abs);
    },
  };

  const plugins: KeenSliderPlugin[] = [WheelControls];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    options,
    plugins
  );

  const scrollByView = (direction: 'prev' | 'next') => {
    const slider = instanceRef.current;
    if (!slider) return;

    if (slidesPerView === 0) {
      return direction === 'prev' ? slider.prev() : slider.next();
    }

    let targetIndex =
      direction === 'prev'
        ? currentIdx - slidesPerView
        : currentIdx + slidesPerView;

    if (targetIndex < minIdx) targetIndex = minIdx;
    if (targetIndex > maxIdx) targetIndex = maxIdx;

    slider.moveToIdx(targetIndex, true, { duration: 1000 });
  };

  const canScrollPrev = currentIdx !== minIdx;
  const canScrollNext = currentIdx !== maxIdx;

  return (
    <div className="w-full lg:px-8">
      <div ref={sliderRef} className="keen-slider">
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByView('prev')}
        className={`carousel-btn left-0 ${canScrollPrev ? 'show' : 'hide'}`}
      >
        <FaChevronLeft className="size-7" />
      </button>
      <button
        type="button"
        onClick={() => scrollByView('next')}
        className={`carousel-btn right-0 ${canScrollNext ? 'show' : 'hide'}`}
      >
        <FaChevronRight className="size-7" />
      </button>
    </div>
  );
};

export default MediaCarousel;
