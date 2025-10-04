import React, { useState } from "react";
import AdminPendingItemsDashboard from "./AdminPendingItemsDashboard";
import { LogOut } from "lucide-react";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("pending"); // default to pending items

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-600">ShareSphere Admin</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3 py-2 rounded-md font-medium ${
                activeTab === "pending" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Pending Items
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "pending" && <AdminPendingItemsDashboard />}
      </main>
    </div>
  );
};

export default AdminDashboard;
