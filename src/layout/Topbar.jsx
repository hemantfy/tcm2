export default function Topbar({ onToggleSidebar }) {
    return (
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label="Toggle sidebar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗂️</span>
            <span className="font-semibold tracking-tight text-lg">DKT Task System</span>
          </div>
  
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">
              Welcome, Administrator
            </span>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 grid place-items-center text-white">
              AD
            </div>
          </div>
        </div>
      </header>
    );
  }
  