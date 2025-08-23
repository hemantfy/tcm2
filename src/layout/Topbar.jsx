export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="sticky top-4 z-40 mx-4 mt-4 rounded-full bg-white/80 backdrop-blur shadow-md">
      <div className="px-4 py-2 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
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
          <span className="text-sm text-gray-500 hidden md:block">
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