import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/posts/hello-world", label: "Sample Post" },
  { to: "/admin", label: "Admin" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 flex-col border-r border-slate-900/80 bg-slate-950/80 px-3 py-4 backdrop-blur lg:flex">
      <div className="mb-4 rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-3 text-xs text-slate-300 shadow-lg shadow-slate-950/60">
        <p className="font-semibold text-slate-100">Project Overview</p>
        <p className="mt-1 text-[11px] leading-tight text-slate-400">
          Manage posts, experiment with JWT auth, and prototype your next
          product-level UI.
        </p>
      </div>

      <nav className="space-y-1 text-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex items-center justify-between rounded-xl px-3 py-2 transition",
                "border border-transparent",
                isActive
                  ? "bg-slate-900/90 border-sky-500/60 text-sky-100 shadow-md shadow-sky-900/40"
                  : "text-slate-300/90 hover:bg-slate-900/60 hover:text-white/90 hover:border-slate-800",
              ].join(" ")
            }
          >
            <span>{item.label}</span>
            <span className="text-[10px] text-slate-500">
              {item.to === "/" ? "All posts" : ""}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 text-[10px] text-slate-500">
        <p className="font-medium text-slate-400">Environment</p>
        <p>Frontend · React + Tailwind</p>
        <p>Backend · Django + JWT</p>
      </div>
    </aside>
  );
}
