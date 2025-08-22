export default function Sidebar({ open, current = "dashboard", navigate }) {
  const Item = ({ id, icon, label }) => (
    <button
      onClick={() => navigate?.(id)}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl
        text-slate-600 hover:text-slate-900 hover:bg-slate-100
        ${current === id ? "bg-slate-200 text-slate-900" : ""}
        ${open ? "" : "justify-center"}`}
      title={open ? undefined : label} // tooltip when collapsed
    >
      {icon}
      {open && <span className="text-sm font-medium">{label}</span>}
    </button>
  );

  return (
    <aside
      className={`
        ${open ? "w-60" : "w-16"}
        shrink-0 transition-[width] duration-200
        bg-slate-100/70 backdrop-blur border-r border-slate-200
        text-slate-700
      `}
    >
      {/* top cluster only — no "PAGES" header */}
      <div className="h-full flex flex-col pt-3 px-2 gap-1">
        <Item id="dashboard" label="Dashboard" icon={<i className="i-lucide-layout-dashboard" />} />
        <Item id="clients"   label="Clients"    icon={<i className="i-lucide-users" />} />
        <Item id="employees" label="Employees"  icon={<i className="i-lucide-badge" />} />
        <Item id="documents" label="Documents"  icon={<i className="i-lucide-files" />} />
      </div>
    </aside>
  );
}
