import React, { useState, useEffect } from "react";
import { Heart, Search, Tag, User, Mail, Camera, LogOut } from "lucide-react";
import apiCall from "../api/apiCall";
import { API_BASE } from "../api/config";

// UI imports from shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Item Card Component
const ItemCard = ({ item }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
      {item.photo_path ? (
        <img
          src={`${API_BASE}/uploads/${item.photo_path.replace(/\\/g, "/").split("/").pop()}`}
          alt={item.item_name || "Item"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <Camera className="text-gray-400 w-12 h-12" />
        </div>
      )}
    </div>

    <div className="p-6">
      <h3 className="font-bold text-lg text-gray-800 mb-2">{item.item_name}</h3>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Tag className="w-4 h-4" />
          <span>{item.category}</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              item.item_condition === "New"
                ? "bg-green-100 text-green-800"
                : item.item_condition === "Like New"
                ? "bg-blue-100 text-blue-800"
                : item.item_condition === "Good"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {item.item_condition}
          </span>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-2">Donated by:</p>
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-800">{item.donor_name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <Mail className="w-4 h-4" />
          <span>{item.donor_email}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Contact Donor
      </button>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
  });

  const categories = [
    "Furniture",
    "Electronics",
    "Clothing",
    "Books",
    "Toys",
    "Kitchenware",
    "Groceries",
    "Home Decor",
    "Cleaning Supplies",
    "Miscellaneous",
  ];
  const conditions = [
    "New",
    "Like New",
    "Good",
    "Fair",
    "Needs Repair",
    "For Parts",
  ];

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      let endpoint = "/item/get-items";

      // If there are search params, use search endpoint
      if (searchQuery || filters.category || filters.condition) {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (filters.category) params.append("category", filters.category);
        if (filters.condition) params.append("condition", filters.condition);
        endpoint = `/item/search-items?${params.toString()}`;
      }

      const response = await apiCall(endpoint);
      setItems(response.items || []);
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchQuery, filters]);

  // Browse Items Tab
  const BrowseItems = () => (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filters.condition}
            onChange={(e) =>
              setFilters({ ...filters, condition: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Conditions</option>
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            No items found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );

  // Profile Tab
  const ProfileTab = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          ShareSphere Dashboard
        </h1>

        {/* Avatar Dropdown */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/default-user.png" alt="User" />
                <AvatarFallback>
                  {localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user")).name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                onClick={onLogout}
                className="text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "browse" && <BrowseItems />}
        {activeTab === "profile" && <ProfileTab />}
      </main>
    </div>
  );
};

export default Dashboard;
