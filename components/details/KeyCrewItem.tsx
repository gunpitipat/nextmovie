'use client';

import { useEffect, useRef, useState } from 'react';
import { formatGroupName } from '@/lib/utils';
import type { CrewGroup } from '@/lib/utils';
import type { Crew, TVCrew } from '@/types';

interface KeyCrewItemProps {
  group: CrewGroup;
  crew: (Crew | TVCrew)[];
  onExpandStart?: () => void;
  onExpandEnd?: () => void;
  onExpand?: (delta: number) => void;
}

const KeyCrewItem = ({
  group,
  crew,
  onExpandStart,
  onExpandEnd,
  onExpand,
}: KeyCrewItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const visibleContentRef = useRef<HTMLSpanElement>(null);
  const hiddenContentRef = useRef<HTMLSpanElement>(null);

  const MAX_VISIBLE = 8;
  let visibleCrew: (Crew | TVCrew)[];
  let hiddenCrew: (Crew | TVCrew)[] | null;

  if (crew.length > MAX_VISIBLE) {
    visibleCrew = crew.slice(0, MAX_VISIBLE);
    hiddenCrew = crew.slice(MAX_VISIBLE);
  } else {
    visibleCrew = crew;
    hiddenCrew = null;
  }

  const handleClick = () => {
    onExpandStart?.();
    onExpand?.(hiddenContentRef.current?.getBoundingClientRect().height ?? 0);
    setIsExpanded(true);
  };

  // Expand hidden content
  useEffect(() => {
    const container = containerRef.current;
    const visibleContent = visibleContentRef.current;
    if (!container || !visibleContent) return;

    const handleTransitionEnd = () => {
      onExpandEnd?.();
    };

    container.addEventListener('transitionend', handleTransitionEnd);

    const UNDERLINE_OFFSET_PX = 3; // button's underline height + offset

    container.style.maxHeight = isExpanded
      ? `${container.scrollHeight}px`
      : `${visibleContent.getBoundingClientRect().height + UNDERLINE_OFFSET_PX}px`; // Prevent underline from being clipped

    // Update max-height on resize
    const observer = new ResizeObserver(() => {
      container.style.maxHeight = isExpanded
        ? `${container.scrollHeight}px`
        : `${visibleContent.getBoundingClientRect().height + UNDERLINE_OFFSET_PX}px`;
    });

    observer.observe(container);

    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
      observer.disconnect();
    };
  }, [isExpanded, onExpandEnd]);

  // Crew list is expected to be homogeneous (all Crew or all TVCrew),
  // based on TMDB API response shape and grouping utils.
  const isTVCrew = (people: (Crew | TVCrew)[]): people is TVCrew[] =>
    'total_episode_count' in people[0];

  return (
    <div className="border-surface-2 flex gap-2.5 border-b pb-2">
      <h3 className="badge flex-none self-start px-2 py-px text-sm font-medium">
        {formatGroupName(group)}
      </h3>

      <div
        ref={containerRef}
        className="text-secondary overflow-hidden py-0.5 text-sm transition-[max_height] duration-400 ease-in-out"
      >
        <span ref={visibleContentRef}>
          {isTVCrew(visibleCrew)
            ? visibleCrew.map((person, idx) => (
                <span key={person.id}>
                  {person.name}
                  <span className="text-muted">
                    {' '}
                    ({person.total_episode_count}&nbsp;ep)
                  </span>
                  {hiddenCrew ? ' • ' : idx < visibleCrew.length - 1 && ' • '}
                </span>
              ))
            : visibleCrew.map((person, idx) => (
                <span key={person.id}>
                  {person.name}
                  {hiddenCrew ? ' • ' : idx < visibleCrew.length - 1 && ' • '}
                </span>
              ))}

          {hiddenCrew && !isExpanded && (
            <button
              type="button"
              onClick={handleClick}
              className="hover:text-highlight text-secondary text-sm underline underline-offset-2 transition-colors duration-200 ease-in-out"
            >
              View {hiddenCrew.length} more
            </button>
          )}
        </span>

        {hiddenCrew && (
          <span
            ref={hiddenContentRef}
            className={`${isExpanded ? 'show' : 'hide'}`}
          >
            {isTVCrew(hiddenCrew)
              ? hiddenCrew.map((person, idx) => (
                  <span key={person.id}>
                    {person.name}
                    <span className="text-muted">
                      {' '}
                      ({person.total_episode_count}&nbsp;ep)
                    </span>
                    {idx < hiddenCrew.length - 1 && ' • '}
                  </span>
                ))
              : hiddenCrew.map((person, idx) => (
                  <span key={person.id}>
                    {person.name}
                    {idx < hiddenCrew.length - 1 && ' • '}
                  </span>
                ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default KeyCrewItem;
