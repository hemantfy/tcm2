import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import WelcomeModal from '../components/WelcomeModal';

const Dashboard = () => {
  const [tasks, _setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const navigate = useNavigate();

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    let day, month, year;
    if (dateString.includes('/')) {
      [day, month, year] = dateString.split('/').map(Number);
    } else if (dateString.includes('-')) {
      [year, month, day] = dateString.split('-').map(Number);
    } else {
      return null;
    }
    return new Date(year, month - 1, day);
  };

  const formatDate = (dateString) => {
    const date = parseDate(dateString);
    return date ? date.toLocaleDateString('en-GB') : '';
  };

  const stats = {
    total: tasks.length,
    open: tasks.filter(task => task.status === 'Open').length,
    overdue: tasks.filter(task => {
      const dueDate = parseDate(task.due);
      return dueDate && dueDate < new Date() && task.status !== 'Done';
    }).length,
    doneThisWeek: tasks.filter(task => {
      const taskDate =  parseDate(task.completedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return task.status === 'Done' && taskDate && taskDate >= weekAgo;
    }).length
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'All Statuses' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priorities' || task.priority === priorityFilter;
    const taskDate = parseDate(task.dueDate);
    const from = parseDate(fromDate);
    const to = parseDate(toDate);
    const matchesDate = (
        (!from || (taskDate && taskDate >= from)) &&
      (!to || (taskDate && taskDate <= to))
    );
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
     return matchesStatus && matchesPriority && matchesDate && matchesSearch;
  });

  const handleAddTask = () => {
    navigate('/taskform');
  };

  return (
    <>
      {showWelcomeModal && (
        <WelcomeModal onClose={handleCloseWelcomeModal} />
      )}
      <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Task Management System</h1>
          <p className="text-gray-600">Track, prioritize, and resolve tasks across your teams and clients.</p>
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeInUp">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Total Tasks</h3>
          <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeInUp">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Open</h3>
          <span className="text-3xl font-bold text-gray-900">{stats.open}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeInUp">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Overdue</h3>
          <span className="text-3xl font-bold text-red-600">{stats.overdue}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm  hover:shadow-lg hover:-translate-y-1 transition-all duration-150 animate-fadeInUp">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Done (This Week)</h3>
          <span className="text-3xl font-bold text-green-600">{stats.doneThisWeek}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex gap-3">
         <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full appearance-none rounded-lg bg-white px-3 py-2 pr-10 text-sm border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-ms-expand]:hidden"
            >
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="block w-full appearance-none rounded-lg bg-white px-3 py-2 pr-10 text-sm border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-ms-expand]:hidden"
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">From:</label>
            <input
              type="date"
              lang="en-GB"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="text-sm text-gray-700">To:</label>
            <input
              type="date"
              lang="en-GB"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by title, client, assignee…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-80"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assignee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 italic">
                    No tasks match your filters.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{task.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{task.assignee}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(task.dueDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;