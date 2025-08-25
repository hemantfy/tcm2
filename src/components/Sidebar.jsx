import React from 'react';

const iconCls = "w-5 h-5";

const DashboardIcon = () => (
  <svg
    className={iconCls}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="8" height="8" />
    <rect x="13" y="3" width="8" height="8" />
    <rect x="13" y="13" width="8" height="8" />
    <rect x="3" y="13" width="8" height="8" />
  </svg>
);

const ClientsIcon = () => (
  <svg
    className={iconCls}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EmployeesIcon = () => (
  <svg
    className={iconCls}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="M15 8h4" />
    <path d="M15 12h4" />
    <path d="M7 17h10" />
  </svg>
);

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
        <Item id="dashboard" label="Dashboard" icon={<i className="DashboardIcon" />} />
        <Item id="clients"   label="Clients"    icon={<i className="ClientsIcon" />} />
        <Item id="employees" label="Employees"  icon={<i className="EmployeesIcon" />} />
      </div>
    </aside>
  );
}