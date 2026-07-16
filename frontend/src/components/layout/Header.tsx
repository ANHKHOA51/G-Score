import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  let title = "G-Scores";
  if (location.pathname === "/") title = "Score Lookup";
  else if (location.pathname === "/report") title = "Statistics & Reports";
  else if (location.pathname === "/leaderboard") title = "Top 10 Leaderboard";

  return (
    <header className="flex justify-between items-center h-16 px-container-padding bg-surface border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <span className="font-headline-md text-headline-md text-on-surface font-bold">{title}</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  );
}
