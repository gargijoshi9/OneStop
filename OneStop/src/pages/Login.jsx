import React, { createContext, useContext, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';  // ✅ Import Heroicons

// Authentication Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Home Page Component
const Home = ({ onLogout }) => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-900 text-white rounded-lg shadow-lg p-8 border border-gray-700 text-center">
        <h2 className="text-3xl font-bold">Welcome, {user?.name}!</h2>
        <p className="mt-2 text-gray-400">You have successfully logged in.</p>
        <button
          onClick={onLogout}
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Login Form Component
function Login({ onLoginSuccess, onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const { setUser } = useAuth();

  // ✅ New Password Strength Logic (3-level system)
  const checkPasswordStrength = (pw) => {
    if (!pw || pw.length === 0) {
      setPasswordStrength("");
      setPasswordStrengthColor("");
      return;
    }

    const hasSpecialChar = /[^a-zA-Z0-9]/.test(pw);

    if (pw.length <= 3 && !hasSpecialChar) {
      setPasswordStrength("Weak");
      setPasswordStrengthColor("text-red-500");
    } else if (pw.length >= 4 && pw.length <= 7 && !hasSpecialChar) {
      setPasswordStrength("Medium");
      setPasswordStrengthColor("text-yellow-500");
    } else if (pw.length >= 8 || hasSpecialChar) {
      setPasswordStrength("Strong");
      setPasswordStrengthColor("text-green-500");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  // Login Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    if (passwordStrength === "Weak" && password.length > 0) {
      setError("Please choose a stronger password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!email || !password) throw new Error("Please enter both email and password");
      setUser({ email, name: email.split("@")[0] });
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-900 text-white rounded-lg shadow-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-400">
            Log in to your sAarthI account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-md border border-red-700">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                data-testid="password-input"
              />
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordStrength && (
              <p className={`text-xs mt-1 ${passwordStrengthColor}`}>
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || passwordStrength === "Weak"}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        {/* Signup Redirect */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={onSignUpClick}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main App component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLoginSuccess = () => setCurrentPage('home');
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  switch (currentPage) {
    case 'login':
      return (
        <AuthContext.Provider value={{ user, setUser }}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </AuthContext.Provider>
      );
    case 'home':
      return (
        <AuthContext.Provider value={{ user, setUser }}>
          <Home onLogout={handleLogout} />
        </AuthContext.Provider>
      );
    default:
      return (
        <AuthContext.Provider value={{ user, setUser }}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </AuthContext.Provider>
      );
  }
};

export default App;
