import { useState, useEffect } from 'react';
import { studentApi } from '../api/studentApi';
import type { SubjectStatistic } from '../api/studentApi';
import SubjectFilter from '../components/report/SubjectFilter';
import BarChart from '../components/report/BarChart';
import SummaryTable from '../components/report/SummaryTable';

export default function Report() {
  const [statistics, setStatistics] = useState<SubjectStatistic[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('toan');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await studentApi.getStatistics();
        setStatistics(data);
        if (data.length > 0 && !data.find(s => s.subjectCode === selectedSubject)) {
          setSelectedSubject(data[0].subjectCode);
        }
      } catch (err: any) {
        setError(err.message || 'Error loading data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatistics();
  }, []);

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

  const currentStat = statistics.find(s => s.subjectCode === selectedSubject);

  if (isLoading) {
    return (
      <div className="p-container-padding flex justify-center items-center h-[50vh]">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-container-padding flex justify-center items-center h-[50vh] text-error">
        <div className="text-center p-stack-xl text-error font-body-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="p-container-padding space-y-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-6xl">
        <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-sm">
          Statistics & Score Spectrum Report
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg">
          Statistics of candidates by 4 score levels: Excellent (&ge; 8), Good (6 - 7.9), Average (4 - 5.9), Poor (&lt; 4).
        </p>
      </div>

      <SubjectFilter 
        statistics={statistics} 
        selectedSubject={selectedSubject} 
        onSelect={setSelectedSubject} 
      />

      {currentStat && (
        <div className="grid grid-cols-12 gap-gutter">
          <BarChart data={currentStat} subjectName={getSubjectName(currentStat.subjectCode)} />
          <SummaryTable data={currentStat} />
        </div>
      )}
    </section>
  );
}
