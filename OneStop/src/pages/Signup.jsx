import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // ✅ Import Heroicons

function Signup() {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false); // toggle for Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // toggle for Confirm Password

  // ✅ State for password strength
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // ✅ Password Strength Logic
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate inputs
      if (
        !formData.name ||
        !formData.email ||
        !formData.mobile ||
        !formData.address ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        throw new Error("Please fill in all fields");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (!/^\d{10}$/.test(formData.mobile)) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      // Set user in context
      setUser({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[48rem] h-[48rem] bg-gradient-to-br from-fuchsia-500 to-purple-700 rounded-full opacity-20 blur-3xl animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create an account
          </h2>
          <p className="mt-2 text-white">
            Get personalized educational guidance
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-white/80">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-white/80">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="2"
              required
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg shadow-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="accept_terms"
              name="accept_terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 rounded bg-white/10"
            />
            <label htmlFor="accept_terms" className="ml-2 block text-sm text-white/80">
              I accept the{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white  bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:scale-105 transition-transform duration-200 hover:from-indigo-600 hover:to-pink-600"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        {/* Redirect to login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
