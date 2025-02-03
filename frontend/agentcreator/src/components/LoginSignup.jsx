// src/components/LoginSignup.jsx
import React, { useState } from 'react';

const LoginSignup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-80">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 ${isLogin ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 ${!isLogin ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Signup
          </button>
        </div>
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
