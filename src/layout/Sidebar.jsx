import { useMemo } from "react";

const items = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "clients", label: "Clients", icon: ClientsIcon },
  { id: "employees", label: "Employees", icon: EmployeesIcon },
  { id: "documents", label: "Documents", icon: DocumentsIcon },
];

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


/* --- Tiny inline icons (you can keep yours if you already have them) --- */
function DashboardIcon(props){ return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13h8V3H3v10ZM13 21h8V3h-8v18ZM3 21h8v-6H3v6Z"/></svg>); }
function ClientsIcon(props){ return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 10a5 5 0 0 0-10 0v4h10v-4Z"/><circle cx="17" cy="7" r="3"/></svg>); }
function EmployeesIcon(props){ return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>); }
function DocumentsIcon(props){ return (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>); }
