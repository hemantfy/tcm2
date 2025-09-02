// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Bell } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import LogoutModal from "./LogoutModal";

const Header = ({ onToggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    if (showProfile || showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile, showNotifications]);
  // Mock notifications data
  const notifications = [
    { id: 1, title: "New task assigned", message: "Task #123 has been assigned to you", time: "5 min ago", unread: true },
    { id: 2, title: "Deadline approaching", message: "Project X deadline is tomorrow", time: "2 hours ago", unread: true },
    { id: 3, title: "Task completed", message: "John completed Task #456", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-4 z-40 mx-4 mt-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 px-4 py-2">
        <button
          onClick={onToggleSidebar}
          className="rounded-full border border-gray-200 dark:border-gray-600 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
         <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">TMS</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 dark:text-gray-400 md:block">
            Welcome, Administrator
          </span>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:shadow-lg transition-shadow"
              aria-label="User menu"
            >
              AD
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl text-white">
                    AD
                  </div>
                  <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">Administrator</p>
                  <button
                    className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      navigate("/manage-profile");
                      setShowProfile(false);
                    }}
                  >
                    Manage Profile
                  </button>
                  <button
                    className="mt-2 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <LogoutModal
          onConfirm={() => {
            setShowLogoutConfirm(false);
            navigate("/");
          }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </header>
  );
};

export default Header;
