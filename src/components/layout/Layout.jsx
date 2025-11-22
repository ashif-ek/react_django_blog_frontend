import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* subtle background grid */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_transparent_60%),radial-gradient(circle_at_bottom,_#0f172a_0,_transparent_55%)] opacity-70" />

      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </main>

          <footer className="border-t border-slate-800/70 py-3 text-xs text-slate-500 text-center">
            React + Django Blog · Crafted with care
          </footer>
        </div>
      </div>
    </div>
  );
}
