import { useState, useMemo } from "react";
import Topbar from "./layout/Topbar.jsx";
import Sidebar from "./layout/Sidebar.jsx";
import StatCard from "./components/StatCard.jsx";
import TaskTable from "./components/TaskTable.jsx";
import tasksSeed from "./data/sampleTasks.js";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  const tasks = useMemo(() => {
    return tasksSeed
      .filter(t =>
        !query
          ? true
          : (t.title + " " + t.client + " " + t.assignee)
              .toLowerCase()
              .includes(query.toLowerCase())
      )
      .filter(t => (status === "all" ? true : t.status === status))
      .filter(t => (priority === "all" ? true : t.priority === priority));
  }, [query, status, priority]);

  const kpis = useMemo(() => {
    const total = tasksSeed.length;
    const open = tasksSeed.filter(t => t.status !== "done").length;
    const overdue = tasksSeed.filter(t => t.overdue).length;
    const doneThisWeek = tasksSeed.filter(t => t.status === "done" && t.doneThisWeek).length;
    return { total, open, overdue, doneThisWeek };
  }, []);

  function onNewTask() {
    // TODO: open your create-task modal/drawer
    alert("New Task");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Topbar onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} setStatus={setStatus} setPriority={setPriority} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Title + primary action */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Task Management System
              </h1>
              <p className="text-sm text-slate-500">
                Track, prioritize, and resolve tasks across your teams and clients.
              </p>
            </div>

            <button
              type="button"
              onClick={onNewTask}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm
                         hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Task
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Tasks" value={kpis.total} />
            <StatCard label="Open" value={kpis.open} />
            <StatCard label="Overdue" value={kpis.overdue} tone="warn" />
            <StatCard label="Done (This Week)" value={kpis.doneThisWeek} tone="success" />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
            <div className="flex gap-2">
              <select
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="todo">To‑Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="done">Done</option>
              </select>

              <select
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="relative w-full md:w-80">
              <input
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400"
                placeholder="Search by title, client, assignee…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-60"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <TaskTable rows={tasks} />
          </div>
        </main>
      </div>
    </div>
  );
}
