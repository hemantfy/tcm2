import React from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Users, Calendar, BarChart3 } from "lucide-react";

const WelcomeModal = ({ onClose }) =>
  createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative p-[3px] rounded-lg overflow-hidden max-w-md w-full mx-4">
        <div className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,#3b82f6,transparent_25%,#3b82f6_50%,transparent_75%,#3b82f6)] animate-[spin_4s_linear_infinite]"></div>
        <div className="relative rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Task Management System!</h2>
            <p className="text-gray-600">
              Get started with managing your tasks efficiently and staying organized.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Track Your Tasks</h3>
                <p className="text-sm text-gray-600">Create, assign, and monitor task progress with due dates and priorities.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Collaborate with Teams</h3>
                <p className="text-sm text-gray-600">Assign tasks to team members and track client work efficiently.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Monitor Progress</h3>
                <p className="text-sm text-gray-600">View comprehensive statistics and filter tasks by status and priority.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              onClick={onClose}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );

export default WelcomeModal;
