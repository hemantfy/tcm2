export default function Card({ className = "", muted = false, children, as = "div" }) {
    const Component = as;
    const base = muted ? "card-muted" : "card-surface";
    return <Component className={`${base} ${className}`}>{children}</Component>;
  }
  
  export function CardHeader({ title, subtitle, right }) {
    return (
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-700">{title}</div>
          {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
        </div>
        {right}
      </div>
    );
  }
  
  export function CardBody({ className="", children }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }
  