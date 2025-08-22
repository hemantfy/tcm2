export default function Badge({ children, tone = "default" }) {
    const map = {
      default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
      info: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
      warn: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
      danger: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
      success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${map[tone]}`}>
        {children}
      </span>
    );
  }
  