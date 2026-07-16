import type { TopStudent, SubjectGroup } from '../../api/studentApi';

interface LeaderboardTableProps {
  topStudents: TopStudent[];
  group: SubjectGroup;
}

export default function LeaderboardTable({ topStudents, group }: LeaderboardTableProps) {
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

  const renderRankBadge = (rank: number) => {
    let bgClass = "bg-surface-container text-on-surface-variant";
    let textClass = "";

    if (rank === 1) {
      bgClass = "bg-[#FFD700]";
      textClass = "text-on-surface";
    } else if (rank === 2) {
      bgClass = "bg-[#C0C0C0]";
      textClass = "text-on-surface";
    } else if (rank === 3) {
      bgClass = "bg-[#CD7F32]";
      textClass = "text-on-primary";
    }

    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-data-mono ${bgClass} ${textClass}`}>
        {rank}
      </div>
    );
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm mt-stack-md">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
        <h2 className="font-headline-md text-headline-md text-on-surface">Top 10 Details</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="w-[10%] px-6 py-4 text-left font-label-md text-label-md text-outline uppercase tracking-wider">Rank</th>
              <th className="w-[20%] px-6 py-4 text-left font-label-md text-label-md text-outline uppercase tracking-wider">Registration No.</th>
              <th className="w-[20%] px-6 py-4 text-center font-label-md text-label-md text-outline uppercase tracking-wider">Total Score</th>
              
              {group.subjects.map((subCode) => (
                <th key={subCode} className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">
                  {getSubjectName(subCode)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {topStudents.map((student, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;
              
              return (
                <tr key={student.sbd} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    {renderRankBadge(rank)}
                  </td>
                  <td className={`px-6 py-4 font-data-mono text-data-mono ${isTop3 ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}>
                    {student.sbd}
                  </td>
                  <td className={`px-6 py-4 text-center font-bold ${isTop3 ? 'font-headline-md text-headline-md text-primary' : 'font-body-lg text-body-lg text-on-surface'}`}>
                    {student.totalScore.toFixed(2)}
                  </td>
                  
                  {group.subjects.map((subCode) => (
                    <td key={subCode} className="px-6 py-4 font-data-mono text-data-mono text-center">
                      {typeof student[subCode] === 'number' ? student[subCode].toFixed(2) : '--'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {topStudents.length === 0 && (
          <div className="p-stack-lg text-center text-on-surface-variant flex flex-col items-center">
            <span className="material-symbols-outlined text-[48px] opacity-20 mb-4">search_off</span>
            <p className="font-body-lg text-body-lg">No data available for this group.</p>
          </div>
        )}
      </div>
    </div>
  );
}
