import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    const baseClass = "flex items-center gap-3 px-6 py-3 transition-all duration-150 active:opacity-90 font-body-md text-body-md group";
    if (isActive) {
      return `${baseClass} border-l-4 border-secondary bg-surface-container text-secondary font-bold`;
    }
    return `${baseClass} text-on-surface-variant hover:bg-surface-container-low`;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-sidebar-width bg-surface-container-lowest border-r border-outline-variant flex flex-col py-6 z-50">
      <div className="px-6 mb-10">
        <h1 className="font-headline-lg text-headline-lg font-bold text-primary">G-Scores</h1>
        <p className="font-body-md text-body-md text-on-surface-variant opacity-70 mt-1">THPT 2024 Dashboard</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        <NavLink to="/" className={getNavClass}>
          <span className="material-symbols-outlined">search</span>
          <span>Score Lookup</span>
        </NavLink>
        
        <NavLink to="/report" className={getNavClass}>
          <span className="material-symbols-outlined">analytics</span>
          <span>Statistics & Reports</span>
        </NavLink>
        
        <NavLink to="/leaderboard" className={getNavClass}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
          <span>Leaderboard</span>
        </NavLink>
      </nav>
      
    </aside>
  );
}
