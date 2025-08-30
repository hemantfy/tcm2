import React from 'react';
import { LayoutDashboard, Users, User } from 'lucide-react';

const iconCls = "h-5 w-5";

export default function Sidebar({ open, current = "dashboard", navigate }) {
  const Item = ({ id, icon, label }) => (
    <button
      onClick={() => navigate?.(id)}
       className={`flex items-center w-full px-3 py-2 rounded-full transition-all duration-300 ease-in-out
        text-gray-600 hover:text-blue-600 hover:bg-blue-50
        ${current === id ? "bg-blue-100 text-blue-700" : ""}
        ${open ? "gap-3" : "justify-center"}`}
      title={open ? undefined : label}
    >
      {icon}
      <span
        className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"}`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <aside
      className={`
        ${open ? "w-64" : "w-20"}
        shrink-0 overflow-hidden transition-all duration-300 ease-in-out
        bg-white shadow-md rounded-r-3xl
        text-gray-700
      `}
    >
      <div className="h-full flex flex-col pt-4 px-3 gap-2">
      <Item id="dashboard" label="Dashboard" icon={<LayoutDashboard className={iconCls} />} />
        <Item id="clients"   label="Clients"    icon={<Users className={iconCls} />} />
        <Item id="employees" label="Employees"  icon={<User className={iconCls} />} />
      </div>
    </aside>
  );
}