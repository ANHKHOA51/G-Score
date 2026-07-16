import type { StudentScore } from '../../api/studentApi';
import ScoreCard from './ScoreCard';

interface ScoreGridProps {
  student: StudentScore;
}

export default function ScoreGrid({ student }: ScoreGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <ScoreCard subjectName="Math" score={student.toan} />
      <ScoreCard subjectName="Literature" score={student.ngu_van} />
      <ScoreCard subjectName="Foreign Language" score={student.ngoai_ngu} />
      <ScoreCard subjectName="Physics" score={student.vat_li} />
      <ScoreCard subjectName="Chemistry" score={student.hoa_hoc} />
      <ScoreCard subjectName="Biology" score={student.sinh_hoc} />
      <ScoreCard subjectName="History" score={student.lich_su} />
      <ScoreCard subjectName="Geography" score={student.dia_li} />
      <ScoreCard subjectName="Civic Education" score={student.gdcd} />
    </section>
  );
}
