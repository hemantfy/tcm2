export default function Button({ variant="solid", size="md", className="", children, ...props }) {
    const v = variant === "solid" ? "btn-solid text-white" :
              variant === "soft"  ? "btn-soft text-slate-700" : "hover:bg-slate-100";
    const s = size === "sm" ? "btn-base px-3 py-1.5 text-sm" : "btn-base";
    return (
      <button className={`${s} ${v} border border-slate-200 ${className}`} {...props}>
        {children}
      </button>
    );
  }
  