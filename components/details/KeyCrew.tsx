'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import KeyCrewItem from './KeyCrewItem';
import type { KeyCrewEntry } from '@/lib/utils';
import type { Crew, TVCrew } from '@/types';

interface KeyCrewProps {
  keyCrewEntries: KeyCrewEntry<Crew | TVCrew>[];
  creators?: string[];
}

const CreatorsItem = ({ names }: { names: string[] }) => {
  return (
    <div className="border-surface-2 flex gap-2.5 border-b pb-2">
      <h3 className="badge flex-none self-start px-2 py-px text-sm font-medium">
        Creators
      </h3>
      <p className="text-secondary py-0.5 text-sm">{names.join(' • ')}</p>
    </div>
  );
};

const KeyCrew = ({ keyCrewEntries, creators }: KeyCrewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const isItemExpandingRef = useRef(false);

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

    // Update max-height on resize while expanded
    const observer = new ResizeObserver(() => {
      if (!isExpanded) return;
      if (isItemExpandingRef.current) return; // Avoid overwriting max-height set in `onItemExpand`

      contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
    });

    observer.observe(contentEl);

    return () => observer.disconnect();
  }, [isExpanded]);

  // Pre-expand container max-height so it animates in sync with item expansion
  const onItemExpand = (delta: number) => {
    const contentEl = contentRef.current;
    if (!contentEl) return;
    if (!isExpanded) return;

    contentEl.style.maxHeight = `${contentEl.scrollHeight + delta}px`;
  };

  return (
    <div className="px-content max-w-content w-full">
      <h2 className="heading heading-bar">Key Crew</h2>

      <div className="mt-6 flex flex-col gap-2">
        {creators && creators.length > 0 && <CreatorsItem names={creators} />}
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
              <KeyCrewItem
                key={group}
                group={group}
                crew={crew}
                onExpandStart={() => {
                  isItemExpandingRef.current = true;
                }}
                onExpandEnd={() => {
                  isItemExpandingRef.current = false;
                }}
                onExpand={onItemExpand}
              />
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
