// src/components/Header.jsx
import { useState } from "react";

const Header = ({ onToggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
     <header className="sticky top-4 z-40 mx-4 mt-4 rounded-full bg-white/80 backdrop-blur shadow-md">
      <div className="flex items-center gap-3 px-4 py-2">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗂️</span>
          <span className="text-lg font-semibold tracking-tight">DKT Task System</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden md:block">
            Welcome, Administrator
          </span>
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
              aria-label="User menu"
            >
              AD
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white p-4 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl text-white">
                    AD
                  </div>
                  <p className="mt-2 font-medium text-gray-700">Administrator</p>
                  <button className="mt-4 w-full rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600">
                    Manage Profile
                  </button>
                  <button className="mt-2 w-full rounded-md bg-red-500 px-4 py-1 text-white hover:bg-red-600">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
    </header>
  );
};

export default Header;
