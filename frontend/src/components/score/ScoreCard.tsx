interface ScoreCardProps {
  subjectName: string;
  score: number | null | undefined;
}

export default function ScoreCard({ subjectName, score }: ScoreCardProps) {
  const isNull = score === null || score === undefined;
  
  let scoreColorClass = "text-tertiary opacity-50";
  if (!isNull) {
    if (score >= 8.0) scoreColorClass = "text-[#22C55E]";
    else if (score >= 6.0) scoreColorClass = "text-secondary";
    else if (score >= 4.0) scoreColorClass = "text-[#F59E0B]";
    else scoreColorClass = "text-[#EF4444]";
  }

  return (
    <div className="md:col-span-4 glass-card p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-secondary transition-colors cursor-default bg-surface-container-lowest border border-outline-variant">
      <span className="text-on-surface-variant font-body-md mb-2">{subjectName}</span>
      <div className={`text-headline-xl font-bold group-hover:scale-110 transition-transform ${scoreColorClass}`}>
        {isNull ? '--' : score.toFixed(2)}
      </div>
    </div>
  );
}
