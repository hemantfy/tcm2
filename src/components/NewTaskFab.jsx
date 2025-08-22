export default function NewTaskFab({ collapsed = false, onClick }) {
    return (
      <button
        onClick={onClick}
        className={[
          "fixed bottom-6 z-50 inline-flex items-center gap-2 rounded-full shadow-lg",
          "bg-slate-900 text-white hover:brightness-110 dark:bg-slate-800",
          "transition-all",
          collapsed ? "left-6 h-12 w-12 justify-center" : "left-8 px-4 h-12",
        ].join(" ")}
        aria-label="New Task"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        {!collapsed && <span className="text-sm font-medium">New Task</span>}
      </button>
    );
  }
  