import type { KeenSliderPlugin } from 'keen-slider';

// Enable horizontal wheel/trackpad scrolling by mapping wheel events to Keen Slider drag events
export const WheelControls: KeenSliderPlugin = (slider) => {
  let position: {
    x: number;
    y: number;
  };
  let wheelActive: boolean;
  let touchTimeout: ReturnType<typeof setTimeout>;

  function dispatch(e: WheelEvent, name: string) {
    // Positive wheel delta reduces drag position (slider moves left)
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e: WheelEvent) {
    // Set initial drag position
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, 'ksDragStart');
  }

  function wheel(e: WheelEvent) {
    dispatch(e, 'ksDrag');
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, 'ksDragEnd');
  }

  function eventWheel(e: WheelEvent) {
    // Skip vertical scrolling; let page scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

    e.preventDefault();

    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }

    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, { passive: false });
  });
};
