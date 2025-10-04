// AdminPendingItemsDashboard.js
import React, { useEffect, useState } from "react";
import { apiCall } from "../utils/api";
import { Camera } from "lucide-react";

const AdminPendingItemsDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingItems = async () => {
    setLoading(true);
    try {
      const res = await apiCall("/admin/pending-items");
      setItems(res.items || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (itemId) => {
    try {
      await apiCall(`/admin/approve-item/${itemId}`, { method: "PUT" });
      fetchPendingItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (itemId) => {
    try {
      await apiCall(`/admin/reject-item/${itemId}`, { method: "DELETE" });
      fetchPendingItems();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingItems();
  }, []);

  if (loading) return <div>Loading pending items...</div>;
  if (!items.length) return <div>No pending items found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.item_id} className="bg-white p-4 rounded-lg shadow">
          <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center">
            {item.photo_path ? (
              <img
                src={`http://localhost:3000/${item.photo_path}`}
                alt={item.item_name}
                className="h-full object-cover"
              />
            ) : (
              <Camera className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-bold">{item.item_name}</h3>
          <p className="text-sm text-gray-600">Category: {item.category}</p>
          <p className="text-sm text-gray-600">Condition: {item.item_condition}</p>
          <p className="text-sm text-gray-600 mt-1">
            Donor: {item.donor_name} ({item.donor_email})
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleApprove(item.item_id)}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(item.item_id)}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPendingItemsDashboard;
