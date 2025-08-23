import React from 'react';

export default function Sidebar({ open, current = "dashboard", navigate }) {
  const Item = ({ id, icon, label }) => (
    <button
      onClick={() => navigate?.(id)}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-full transition-colors
        text-gray-600 hover:text-blue-600 hover:bg-blue-50
        ${current === id ? "bg-blue-100 text-blue-700" : ""}
        ${open ? "" : "justify-center"}`}
      title={open ? undefined : label}
    >
      {icon}
      {open && <span className="text-sm font-medium">{label}</span>}
    </button>
  );

  return (
    <aside
      className={`
        ${open ? "w-64" : "w-20"}
        shrink-0 transition-[width] duration-200
        bg-white shadow-md rounded-r-3xl
        text-gray-700
      `}
    >
      <div className="h-full flex flex-col pt-4 px-3 gap-2">
        <Item id="dashboard" label="Dashboard" icon={<i className="i-lucide-layout-dashboard" />} />
        <Item id="clients"   label="Clients"    icon={<i className="i-lucide-users" />} />
        <Item id="employees" label="Employees"  icon={<i className="i-lucide-badge" />} />
      </div>
    </aside>
  );
}