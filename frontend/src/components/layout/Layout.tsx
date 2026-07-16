import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
