export function Select({ className="", ...props }) {
    return (
      <select
        {...props}
        className={`px-3 py-2 rounded-xl border border-slate-200 bg-white ${className}`}
      />
    );
  }
  