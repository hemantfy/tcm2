export default function Section({ title, subtitle, right, className="", children }) {
    return (
      <section className={`space-y-3 ${className}`}>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {right}
        {children}
      </section>
    );
  }
  