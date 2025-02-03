// src/components/ModernWebsite.jsx
import React, { useState, useEffect } from 'react';
import LoginSignup from './LoginSignup';

const ModernWebsite = () => {
  const [theme, setTheme] = useState('system'); // 'system', 'dark', or 'light'
  const [showLogin, setShowLogin] = useState(false);

  // Update theme based on selection
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System mode: detect user preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          AI Agents Platform
        </h1>
        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Theme toggles */}
          <div>
            <button
              onClick={() => setTheme('light')}
              className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="px-2 py-1 border rounded ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className="px-2 py-1 border rounded ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              System
            </button>
          </div>
          {/* Action toggles */}
          <div>
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Try Now
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ml-2"
            >
              View Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {showLogin ? (
          <LoginSignup onClose={() => setShowLogin(false)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fadeIn">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                  Dummy Card {i + 1}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center bg-gray-200 dark:bg-gray-800">
        <p className="text-gray-700 dark:text-gray-300">
          © 2025 AI Agents Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ModernWebsite;
