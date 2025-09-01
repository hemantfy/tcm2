import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, TrendingUp, Users, CheckCircle, AlertCircle, Calendar, BarChart3 } from 'lucide-react';
import { StatsCard, BarChart, LineChart, PieChart, ProgressBar } from '../components/ui/Charts';
import { SearchInput, Select, DatePicker } from '../components/ui/Form';
import { DataTable } from '../components/ui/DataTable';
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

  // Enhanced mock data for better visualization
  const mockTasks = [
    { id: 1, title: 'Website Redesign', client: 'ABC Corp', assignee: 'John Doe', status: 'In Progress', priority: 'High', dueDate: '2024-01-20' },
    { id: 2, title: 'Mobile App Testing', client: 'XYZ Ltd', assignee: 'Jane Smith', status: 'Open', priority: 'Medium', dueDate: '2024-01-25' },
    { id: 3, title: 'Database Migration', client: 'Tech Solutions', assignee: 'Mike Johnson', status: 'Done', priority: 'High', dueDate: '2024-01-15' },
    { id: 4, title: 'Security Audit', client: 'SecureCorp', assignee: 'Sarah Wilson', status: 'Open', priority: 'High', dueDate: '2024-01-18' },
    { id: 5, title: 'Content Creation', client: 'Media Inc', assignee: 'Tom Brown', status: 'In Progress', priority: 'Low', dueDate: '2024-01-30' },
  ];

  const allTasks = tasks.length > 0 ? tasks : mockTasks;

  const stats = {
    total: allTasks.length,
    open: allTasks.filter(task => task.status === 'Open').length,
    inProgress: allTasks.filter(task => task.status === 'In Progress').length,
    overdue: allTasks.filter(task => {
      const dueDate = parseDate(task.dueDate);
      return dueDate && dueDate < new Date() && task.status !== 'Done';
    }).length,
    doneThisWeek: allTasks.filter(task => {
      const taskDate = parseDate(task.completedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return task.status === 'Done' && taskDate && taskDate >= weekAgo;
    }).length
  };

  // Chart data
  const taskStatusData = [
    { label: 'Open', value: stats.open, color: 'bg-blue-500' },
    { label: 'In Progress', value: stats.inProgress, color: 'bg-yellow-500' },
    { label: 'Done', value: allTasks.filter(t => t.status === 'Done').length, color: 'bg-green-500' },
  ];

  const priorityData = [
    { label: 'High', value: allTasks.filter(t => t.priority === 'High').length },
    { label: 'Medium', value: allTasks.filter(t => t.priority === 'Medium').length },
    { label: 'Low', value: allTasks.filter(t => t.priority === 'Low').length },
  ];

  const weeklyProgressData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 8 },
    { label: 'Thu', value: 15 },
    { label: 'Fri', value: 22 },
    { label: 'Sat', value: 6 },
    { label: 'Sun', value: 4 },
  ];

  // Table columns
  const taskColumns = [
    { header: 'Task', accessor: 'title', sortable: true },
    { header: 'Client', accessor: 'client', sortable: true },
    { header: 'Assignee', accessor: 'assignee', sortable: true },
    { 
      header: 'Status', 
      accessor: 'status', 
      type: 'badge',
      badgeVariant: (value) => {
        switch (value) {
          case 'Open': return 'info';
          case 'In Progress': return 'warning';
          case 'Done': return 'success';
          default: return 'default';
        }
      },
      sortable: true 
    },
    { 
      header: 'Priority', 
      accessor: 'priority', 
      type: 'badge',
      badgeVariant: (value) => {
        switch (value) {
          case 'High': return 'error';
          case 'Medium': return 'warning';
          case 'Low': return 'default';
          default: return 'default';
        }
      },
      sortable: true 
    },
    { header: 'Due Date', accessor: 'dueDate', type: 'date', sortable: true },
  ];

  const taskActions = [
    { label: 'View', onClick: (row) => console.log('View task:', row) },
    { label: 'Edit', onClick: (row) => console.log('Edit task:', row) },
    { label: 'Delete', onClick: (row) => console.log('Delete task:', row) },
  ];

  const filteredTasks = allTasks.filter(task => {
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Tasks" 
          value={stats.total} 
          change={12}
          changeType="positive"
          icon={BarChart3}
        />
        <StatsCard 
          title="Open Tasks" 
          value={stats.open} 
          change={-5}
          changeType="negative"
          icon={AlertCircle}
        />
        <StatsCard 
          title="In Progress" 
          value={stats.inProgress} 
          change={8}
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard 
          title="Completed" 
          value={allTasks.filter(t => t.status === 'Done').length} 
          change={15}
          changeType="positive"
          icon={CheckCircle}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <LineChart 
            title="Weekly Task Completion"
            data={weeklyProgressData}
            yAxisLabel="Tasks Completed"
            xAxisLabel="Days of Week"
          />
        </div>
        <div>
          <PieChart 
            title="Task Priority Distribution"
            data={priorityData}
          />
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Progress</h3>
        <div className="space-y-4">
          <ProgressBar 
            label="Website Redesign" 
            value={75} 
            color="blue"
          />
          <ProgressBar 
            label="Mobile App Development" 
            value={45} 
            color="green"
          />
          <ProgressBar 
            label="Database Migration" 
            value={90} 
            color="purple"
          />
          <ProgressBar 
            label="Security Audit" 
            value={30} 
            color="yellow"
          />
        </div>
      </div>

      {/* Status Overview Chart */}
      <div className="mb-8">
        <BarChart 
          title="Task Status Overview"
          data={taskStatusData}
        />
      </div>

      {/* Enhanced Task Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tasks</h3>
        <DataTable 
          data={filteredTasks}
          columns={taskColumns}
          actions={taskActions}
          searchable={true}
          sortable={true}
          paginated={true}
          pageSize={10}
          emptyMessage="No tasks found. Create a new task to get started."
        />
      </div>
      </div>
    </>
  );
};

export default Dashboard;