import React, { useEffect, useState } from "react";
import { apiCall } from "../utils/api"; // Make sure this exists

const UserDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiCall("/item/get-items");
        setItems(data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div>Loading your dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div>
        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.item_name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
