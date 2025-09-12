import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // ✅ FIX: Destructure 'login' from the context, not 'setUser'
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate an API call for the fake login
    setTimeout(() => {
      try {
        // On success, create a user object and call the login function
        const userData = {
          id: '123', // A fake user ID
          email: email,
          name: email.split("@")[0], // Create a name from the email
        };

        // ✅ FIX: Use the 'login' function provided by the context
        login(userData);

        // ✅ FIX: Navigate to the correct lowercase path
        navigate("/dashboard");

      } catch (err) {
        setError("Failed to log in. Please check your credentials.");
        setLoading(false);
      }
      // No need for finally block here, as setLoading is handled in success/error
    }, 1000); // 1-second delay to simulate loading
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center py-12 px-4">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-600 to-blue-800 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[48rem] h-[48rem] bg-gradient-to-br from-pink-600 to-purple-800 rounded-full opacity-20 blur-3xl animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-white/70">Log in to continue your journey.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email address
            </label>
            <div className="relative mt-1">
              <EnvelopeIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80"
            >
              Password
            </label>
            <div className="relative mt-1">
                <LockClosedIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                    id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 disabled:opacity-50 transition-all"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
