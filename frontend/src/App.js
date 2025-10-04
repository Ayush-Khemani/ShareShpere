import React, { useState, useEffect } from 'react';
import { Search, Plus, User, LogOut, Heart, Filter, MapPin, Tag, Camera, Mail, Phone } from 'lucide-react';
import LandingPage from './LandingPage';
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
// API Base URL - Update this to match your backend
const API_BASE = 'http://localhost:3000';

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'API request failed');
  }

  return response.json();
};

// Login Component
const LoginComponent = ({ onLogin, switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Login failed');


      if (data.role) {
        localStorage.setItem('role', data.role.toLowerCase());
        console.log('Role saved to localStorage:', localStorage.getItem('role'));
      } else {
        console.error('Role not found in response');
      }
      localStorage.setItem('token', data.token);

      onLogin();

      console.log('Login response:', data);


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ShareSphere</h1>
          <p className="text-gray-600">Share. Care. Connect.</p>
        </div>

        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={switchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Register Component
const RegisterComponent = ({ onRegister, switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiCall('/auth/registeration', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      setSuccess('Registration successful! Please login.');
      setTimeout(() => switchToLogin(), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join ShareSphere</h1>
          <p className="text-gray-600">Create your account to start sharing</p>
        </div>

        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be 8+ characters with uppercase, lowercase, and number
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={switchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Item Card Component
const ItemCard = ({ item }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
      {item.item_photo ? (
        <img
          src={`${API_BASE}/uploads/${item.photo_path.split('/').pop()}`}
          alt={item.item_name}
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
          <span className={`px-2 py-1 rounded-full text-xs ${item.item_condition === 'New' ? 'bg-green-100 text-green-800' :
            item.item_condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
              item.item_condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
            }`}>
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
  const [activeTab, setActiveTab] = useState('browse');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    condition: ''
  });

  const categories = ['Furniture', 'Electronics', 'Clothing', 'Books', 'Toys', 'Kitchenware', 'Groceries', 'Home Decor', 'Cleaning Supplies', 'Miscellaneous'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Needs Repair', 'For Parts'];

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      let endpoint = '/item/get-items';

      // If there are search params, use search endpoint
      if (searchQuery || filters.category || filters.condition) {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (filters.category) params.append('category', filters.category);
        if (filters.condition) params.append('condition', filters.condition);
        endpoint = `/item/search-items?${params.toString()}`;
      }

      const response = await apiCall(endpoint);

      const normalizedItems = (response.items || []).map(item => ({
        ...item,
        photo_path: (item.photo_path || item.item_photo || '').replace(/\\/g, '/')
      }));

      setItems(normalizedItems);
    } catch (err) {
      console.error('Error fetching items:', err);
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
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.condition}
            onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Conditions</option>
            {conditions.map(cond => (
              <option key={cond} value={cond}>{cond}</option>
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
          <h3 className="text-xl font-medium text-gray-500 mb-2">No items found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
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

  // Donate Item Tab
  const DonateItem = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
      setLoading(true);
      setMessage('');

      try {
        const formData = new FormData();
        formData.append('name', itemName);
        formData.append('category', category);
        formData.append('condition', condition);
        if (selectedFile) {
          formData.append('photo', selectedFile);
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/item/donate-item`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.msg || 'Upload failed');
        }

        const result = await response.json();
        setMessage(result.msg);
        setItemName('');
        setCategory('');
        setCondition('');
        setSelectedFile(null);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Donate an Item</h2>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes('approval') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Condition</option>
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only JPEG and PNG files allowed
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !itemName || !category || !condition}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Donate Item'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ShareSphere</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'browse' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                Browse Items
              </button>
              <button
                onClick={() => setActiveTab('donate')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'donate' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                Donate Item
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'browse' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
              }`}
          >
            Browse
          </button>
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'donate' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'
              }`}
          >
            Donate
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' && <BrowseItems />}
        {activeTab === 'donate' && <DonateItem />}
      </main>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (isAuthenticated) {
    const role = localStorage.getItem('role'); // check role after login
    return role === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <Dashboard onLogout={handleLogout} />;
  }

  if (showRegister) {
    return (
      <RegisterComponent
        onRegister={() => setShowRegister(false)}
        switchToLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <LoginComponent
      onLogin={handleLogin}
      switchToRegister={() => setShowRegister(true)}
    />
  );
};

export default App;