import React from 'react';
import { LayoutDashboard, Users, User, FileText, Settings, BarChart3, Calendar, MessageSquare, Plus } from 'lucide-react';

const iconCls = "h-5 w-5";

export default function Sidebar({ open, current = "dashboard", navigate }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className={iconCls} />, category: "main" },
    { id: "clients", label: "Clients", icon: <Users className={iconCls} />, category: "main" },
    { id: "employees", label: "Employees", icon: <User className={iconCls} />, category: "main" },
    { id: "tasks", label: "Tasks", icon: <BarChart3 className={iconCls} />, category: "main" },
    { id: "calendar", label: "Calendar", icon: <Calendar className={iconCls} />, category: "main" },
    { id: "documents", label: "Documents", icon: <FileText className={iconCls} />, category: "tools" },
    { id: "messages", label: "Messages", icon: <MessageSquare className={iconCls} />, category: "tools" },
    { id: "reports", label: "Reports", icon: <BarChart3 className={iconCls} />, category: "tools" },
    { id: "settings", label: "Settings", icon: <Settings className={iconCls} />, category: "settings" },
  ];

  const quickActions = [
    { id: "add-clients", label: "Add Client", icon: <Plus className="h-4 w-4" /> },
    { id: "add-employees", label: "Add Employee", icon: <Plus className="h-4 w-4" /> },
    { id: "taskform", label: "Add Task", icon: <Plus className="h-4 w-4" /> },
  ];

  const Item = ({ id, icon, label, isQuickAction = false }) => (
    <button
      onClick={() => navigate?.(id)}
      className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-300 ease-in-out group
        text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20
        ${current === id ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : ""}
        ${open ? "gap-3" : "justify-center"}
        ${isQuickAction ? "text-xs" : ""}`}
      title={open ? undefined : label}
    >
      <div className={`${isQuickAction ? 'p-1' : ''} ${current === id ? 'scale-110' : 'group-hover:scale-105'} transition-transform`}>
        {icon}
      </div>
      <span
        className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"}
          ${isQuickAction ? "text-xs" : "text-sm"}`}
      >
        {label}
      </span>
    </button>
  );

  const SectionTitle = ({ title }) => (
    <div className={`px-3 py-2 transition-all duration-300 ease-in-out
      ${open ? "opacity-100" : "opacity-0 max-h-0"}`}
    >
      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );

  const mainItems = menuItems.filter(item => item.category === 'main');
  const toolItems = menuItems.filter(item => item.category === 'tools');
  const settingItems = menuItems.filter(item => item.category === 'settings');

  return (
    <aside
      className={`
        ${open ? "w-64" : "w-20"}
        shrink-0 overflow-hidden transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-800 shadow-md rounded-r-3xl border-r border-gray-200 dark:border-gray-700
        text-gray-700 dark:text-gray-300 h-screen sticky top-0
        ${!open ? 'lg:w-20' : ''}
      `}
    >
      <div className="h-full flex flex-col pt-6 px-3">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainItems.map(item => (
            <Item 
              key={item.id} 
              id={item.id} 
              label={item.label} 
              icon={item.icon} 
            />
          ))}
        </div>

        {/* Quick Actions */}
        {open && (
          <div className="mt-6">
            <SectionTitle title="Quick Actions" />
            <div className="space-y-1 mt-2">
              {quickActions.map(action => (
                <Item 
                  key={action.id} 
                  id={action.id} 
                  label={action.label} 
                  icon={action.icon}
                  isQuickAction={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        <div className="mt-6">
          {open && <SectionTitle title="Tools" />}
          <div className="space-y-1 mt-2">
            {toolItems.map(item => (
              <Item 
                key={item.id} 
                id={item.id} 
                label={item.label} 
                icon={item.icon} 
              />
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mt-auto mb-6">
          {open && <SectionTitle title="Settings" />}
          <div className="space-y-1 mt-2">
            {settingItems.map(item => (
              <Item 
                key={item.id} 
                id={item.id} 
                label={item.label} 
                icon={item.icon} 
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
