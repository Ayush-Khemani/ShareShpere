import React from "react";
import { Heart, Users, Gift } from "lucide-react";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">ShareSphere</h1>
        <button
          onClick={onGetStarted}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Share. Care. Connect.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Give a second life to unused items and help others in your community.
          ShareSphere makes donating and finding items easy, meaningful, and fun.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          Join the Movement
        </button>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Gift className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Donate Items</h3>
            <p className="text-gray-600 text-sm">
              Easily donate items you no longer need to people who can use them.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Users className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Connect with Others</h3>
            <p className="text-gray-600 text-sm">
              Build a caring community where sharing brings people closer.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Heart className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Make an Impact</h3>
            <p className="text-gray-600 text-sm">
              Reduce waste and make a real difference in someone’s life.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} ShareSphere. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
