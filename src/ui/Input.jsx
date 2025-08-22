export function Input({ className="", leftIcon=null, ...props }) {
    return (
      <div className={`relative ${className}`}>
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60">{leftIcon}</span>}
        <input
          {...props}
          className={`w-full ${leftIcon?'pl-10':'pl-3'} pr-3 py-2 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400`}
        />
      </div>
    );
  }
  