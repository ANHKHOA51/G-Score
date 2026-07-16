import type { SubjectStatistic } from '../../api/studentApi';

interface SubjectFilterProps {
  statistics: SubjectStatistic[];
  selectedSubject: string;
  onSelect: (subjectCode: string) => void;
}

export default function SubjectFilter({ statistics, selectedSubject, onSelect }: SubjectFilterProps) {
  const getSubjectName = (code: string) => {
    const names: Record<string, string> = {
      toan: 'Math',
      ngu_van: 'Literature',
      vat_li: 'Physics',
      hoa_hoc: 'Chemistry',
      sinh_hoc: 'Biology',
      lich_su: 'History',
      dia_li: 'Geography',
      gdcd: 'Civic Education',
      ngoai_ngu: 'Foreign Language'
    };
    return names[code] || code;
  };

  return (
    <div className="flex flex-wrap gap-stack-md bg-surface-container-lowest p-stack-md border border-outline-variant rounded-xl overflow-x-auto scrollbar-hide">
      {statistics.map((stat) => {
        const isSelected = selectedSubject === stat.subjectCode;
        const baseClass = "px-6 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95";
        const selectedClass = `${baseClass} bg-secondary text-on-secondary font-bold`;
        const unselectedClass = `${baseClass} border border-outline-variant hover:bg-surface-container text-on-surface-variant`;
        
        return (
          <button
            key={stat.subjectCode}
            onClick={() => onSelect(stat.subjectCode)}
            className={isSelected ? selectedClass : unselectedClass}
          >
            {getSubjectName(stat.subjectCode)}
          </button>
        );
      })}
    </div>
  );
}
