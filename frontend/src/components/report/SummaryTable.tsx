import type { SubjectStatistic } from '../../api/studentApi';

interface SummaryTableProps {
  data: SubjectStatistic;
}

export default function SummaryTable({ data }: SummaryTableProps) {
  const total = data.excellentCount + data.goodCount + data.averageCount + data.poorCount;
  
  const getPercent = (count: number) => {
    if (total === 0) return '0.0%';
    return ((count / total) * 100).toFixed(1) + '%';
  };

  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
      <div className="p-stack-md border-b border-outline-variant bg-surface-container-low">
        <h3 className="font-headline-md text-headline-md text-on-surface">Summary</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="w-[50%] p-4 text-label-md font-label-md text-outline uppercase tracking-wider align-middle">Score Level</th>
              <th className="w-[25%] p-4 text-label-md font-label-md text-outline uppercase tracking-wider text-left align-middle">Count</th>
              <th className="w-[25%] p-4 text-label-md font-label-md text-outline uppercase tracking-wider text-center align-middle">%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="p-4 font-body-md text-body-md align-middle">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-[#22C55E]"></div>
                  Excellent (&gt;= 8.0)
                </div>
              </td>
              <td className="p-4 font-data-mono text-data-mono text-left align-middle">{data.excellentCount.toLocaleString('en-US')}</td>
              <td className="p-4 font-data-mono text-data-mono text-center text-[#22C55E] font-bold align-middle">{getPercent(data.excellentCount)}</td>
            </tr>
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="p-4 font-body-md text-body-md align-middle">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-secondary"></div>
                  Good (6.0 - 7.9)
                </div>
              </td>
              <td className="p-4 font-data-mono text-data-mono text-left align-middle">{data.goodCount.toLocaleString('en-US')}</td>
              <td className="p-4 font-data-mono text-data-mono text-center text-secondary font-bold align-middle">{getPercent(data.goodCount)}</td>
            </tr>
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="p-4 font-body-md text-body-md align-middle">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-[#F59E0B]"></div>
                  Average (4.0 - 5.9)
                </div>
              </td>
              <td className="p-4 font-data-mono text-data-mono text-left align-middle">{data.averageCount.toLocaleString('en-US')}</td>
              <td className="p-4 font-data-mono text-data-mono text-center text-[#F59E0B] font-bold align-middle">{getPercent(data.averageCount)}</td>
            </tr>
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="p-4 font-body-md text-body-md align-middle">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-[#EF4444]"></div>
                  Poor (&lt; 4.0)
                </div>
              </td>
              <td className="p-4 font-data-mono text-data-mono text-left align-middle">{data.poorCount.toLocaleString('en-US')}</td>
              <td className="p-4 font-data-mono text-data-mono text-center text-[#EF4444] font-bold align-middle">{getPercent(data.poorCount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
