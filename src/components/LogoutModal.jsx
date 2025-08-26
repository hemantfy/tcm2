import React from "react";
import { createPortal } from "react-dom";

const LogoutModal = ({ onConfirm, onCancel }) =>
  createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative p-[3px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,red,transparent_25%,red_50%,transparent_75%,red)] animate-[spin_4s_linear_infinite]"></div>
        <div className="relative rounded-lg bg-white p-6 shadow-lg">
          <p className="mb-4 text-gray-700">Are you sure you want to log out?</p>
          <div className="flex justify-end gap-2">
            <button
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={onConfirm}
            >
              Logout
            </button>
            <button
              className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );

export default LogoutModal;