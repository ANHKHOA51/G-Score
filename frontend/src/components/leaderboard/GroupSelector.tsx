import type { SubjectGroup } from '../../api/studentApi';

interface GroupSelectorProps {
  groups: SubjectGroup[];
  selectedGroup: string;
  onSelect: (groupCode: string) => void;
}

export default function GroupSelector({ groups, selectedGroup, onSelect }: GroupSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedGroup}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 pr-10 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer w-full md:w-auto"
      >
        {groups.map((group) => (
          <option key={group.code} value={group.code}>
            Group {group.code} ({group.name})
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
        expand_more
      </span>
    </div>
  );
}
