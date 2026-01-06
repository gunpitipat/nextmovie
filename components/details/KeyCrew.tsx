'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { formatGroupName } from '@/lib/utils';
import type { CrewGroup, KeyCrewEntry } from '@/lib/utils';
import type { Crew, TVCrew } from '@/types';

interface KeyCrewItemProps {
  group: CrewGroup;
  crew: (Crew | TVCrew)[];
}

interface KeyCrewProps {
  keyCrewEntries: KeyCrewEntry<Crew | TVCrew>[];
}

const KeyCrewItem = ({ group, crew }: KeyCrewItemProps) => {
  // Crew list is expected to be homogeneous (all Crew or all TVCrew),
  // based on TMDB API response shape and grouping utils.
  const isTVCrew = (people: (Crew | TVCrew)[]): people is TVCrew[] =>
    'total_episode_count' in people[0];

  return (
    <div className="border-surface-2 flex gap-2.5 border-b pb-2">
      <h3 className="badge flex-none self-start px-2 py-px text-sm font-medium">
        {formatGroupName(group)}
      </h3>

      <p className="text-secondary self-center text-sm">
        {isTVCrew(crew)
          ? crew.map((person, idx) => (
              <span key={person.id}>
                {person.name}
                <span className="text-muted">
                  {' '}
                  ({person.total_episode_count}&nbsp;ep)
                </span>
                {idx < crew.length - 1 && ' • '}
              </span>
            ))
          : crew.map((person, idx) => (
              <span key={person.id}>
                {person.name}
                {idx < crew.length - 1 && ' • '}
              </span>
            ))}
      </p>
    </div>
  );
};

const KeyCrew = ({ keyCrewEntries }: KeyCrewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  let pinnedEntries = keyCrewEntries.filter(
    ([group]) => group === 'directors' || group === 'writers'
  );
  if (pinnedEntries.length === 0) pinnedEntries = keyCrewEntries.slice(0, 2);

  const restEntries = keyCrewEntries.filter(
    ([group]) => !pinnedEntries.some(([pinnedGroup]) => pinnedGroup === group)
  );

  // Expand and collapse content
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    contentEl.style.maxHeight = isExpanded
      ? `${contentEl.scrollHeight}px`
      : '0px';

    // Update max height on resize while expanded
    const observer = new ResizeObserver(() => {
      if (isExpanded) {
        contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
      }
    });

    observer.observe(contentEl);

    return () => observer.disconnect();
  }, [isExpanded]);

  return (
    <div className="px-content max-w-content w-full">
      <h2 className="heading heading-bar">Key Crew</h2>

      <div className="mt-6 flex flex-col gap-2">
        {pinnedEntries.map(([group, crew]) => (
          <KeyCrewItem key={group} group={group} crew={crew} />
        ))}
      </div>

      {restEntries.length > 0 && (
        <>
          <div
            ref={contentRef}
            className="mt-2 flex flex-col gap-2 overflow-hidden transition-[max_height] duration-400 ease-in-out"
          >
            {restEntries.map(([group, crew]) => (
              <KeyCrewItem key={group} group={group} crew={crew} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:text-highlight flex h-11 items-center justify-center gap-1 text-base transition-colors duration-200 ease-in-out"
          >
            {!isExpanded ? 'Show more' : 'Show less'}
            {!isExpanded ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </>
      )}
    </div>
  );
};

export default KeyCrew;
