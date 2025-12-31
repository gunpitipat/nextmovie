'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { formatGroupName } from '@/lib/utils';
import type { CrewGroup, KeyCrewEntry } from '@/lib/utils';
import type { Crew } from '@/types';

interface KeyCrewItemProps {
  group: CrewGroup;
  crew: Crew[];
}

interface KeyCrewProps {
  keyCrewEntries: KeyCrewEntry[];
}

const KeyCrewItem = ({ group, crew }: KeyCrewItemProps) => {
  return (
    <div className="border-surface-2 flex gap-2.5 border-b pb-2">
      <h3 className="border-surface-3 bg-surface-2 flex-none self-start rounded-lg border px-2 py-px text-sm font-medium">
        {formatGroupName(group)}
      </h3>
      <p className="text-secondary self-center text-sm">
        {crew.map((person) => person.name).join(' • ')}
      </p>
    </div>
  );
};

const KeyCrew = ({ keyCrewEntries }: KeyCrewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const directors = keyCrewEntries.find(([group]) => group === 'directors');
  const writers = keyCrewEntries.find(([group]) => group === 'writers');
  const restEntries = keyCrewEntries.filter(
    ([group]) => group !== 'directors' && group !== 'writers'
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
    <div className="px-content w-full max-w-7xl">
      <h2 className="heading">Key Crew</h2>

      <div className="mt-6 flex flex-col gap-2">
        {directors && <KeyCrewItem group={directors[0]} crew={directors[1]} />}
        {writers && <KeyCrewItem group={writers[0]} crew={writers[1]} />}
      </div>

      <div
        ref={contentRef}
        className="mt-2 flex flex-col gap-2 overflow-hidden transition-[max_height] duration-400 ease-in-out"
      >
        {restEntries.map(([group, crew]) => (
          <KeyCrewItem key={group} group={group} crew={crew} />
        ))}
      </div>

      {restEntries.length > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:text-highlight flex h-11 items-center justify-center gap-1 text-base transition-colors duration-200 ease-in-out"
        >
          {!isExpanded ? 'Show more' : 'Show less'}
          {!isExpanded ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      )}
    </div>
  );
};

export default KeyCrew;
