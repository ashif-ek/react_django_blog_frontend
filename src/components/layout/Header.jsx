import { Link } from "react-router-dom";
import { logout } from "../../services/api";

export default function Header() {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 shadow-lg shadow-sky-500/30">
            <span className="text-sm font-black tracking-tight text-slate-950">
              RD
            </span>
          </div>
          <div>
            <Link
              to="/"
              className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-base font-semibold tracking-tight text-transparent sm:text-lg"
            >
              React + Django Blog
            </Link>
            <p className="text-xs text-slate-400 hidden sm:block">
              Lightweight, production-ready blog stack.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/"
            className="hidden text-slate-300/90 transition hover:text-white/90 sm:inline"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="hidden text-slate-300/90 transition hover:text-white/90 sm:inline"
          >
            Admin
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-200 shadow-sm shadow-slate-900/40 transition hover:border-sky-500 hover:bg-slate-900 hover:text-sky-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-xs font-medium text-slate-950 shadow-md shadow-sky-500/40 transition hover:from-sky-400 hover:to-indigo-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
    </header>
  );
}
