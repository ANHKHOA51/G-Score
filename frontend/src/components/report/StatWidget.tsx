interface StatWidgetProps {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
}

export default function StatWidget({ title, value, icon, colorClass }: StatWidgetProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-surface-container-low ${colorClass}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-label-md font-label-md text-on-surface-variant">{title}</p>
        <p className={`font-headline-md text-headline-md ${colorClass}`}>{value}</p>
      </div>
    </div>
  );
}
