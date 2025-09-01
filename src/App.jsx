import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';
import ClientForm from './forms/ClientForm';
import Employees from './pages/Employees';
import TaskForm from './forms/TaskForm';
import Documents from './pages/Documents';
import './App.css';
import EmployeeForm from './forms/EmployeeForm';
import ClientProfile from "./pages/ClientProfile";
import EmployeeProfile from "./pages/EmployeeProfile";
import ManageProfile from "./pages/ManageProfile";

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`);
  };

  const getCurrentPage = () => {
    const path = location.pathname.slice(1);
    return path || 'dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="flex">
        <Sidebar 
          open={sidebarOpen} 
          current={getCurrentPage()} 
          navigate={handleNavigate} 
        />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/add-clients" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientProfile />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeProfile />} />
            <Route path="/add-employees" element={<EmployeeForm />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/taskform" element={<TaskForm />} />
            <Route path="/manage-profile" element={<ManageProfile />} />
            <Route path="/tasks" element={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Tasks page coming soon...</div>} />
            <Route path="/calendar" element={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Calendar page coming soon...</div>} />
            <Route path="/messages" element={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Messages page coming soon...</div>} />
            <Route path="/reports" element={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Reports page coming soon...</div>} />
            <Route path="/settings" element={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Settings page coming soon...</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;