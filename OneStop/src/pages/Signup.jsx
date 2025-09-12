import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Signup() {
  // ✅ FIX: Destructure the 'login' function from the context
  const { login } = useAuth();
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: '', color: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (pw) => {
    if (!pw) {
      setPasswordStrength({ text: '', color: '' });
      return;
    }
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(pw);
    if (pw.length >= 8 && hasSpecialChar) {
      setPasswordStrength({ text: 'Strong', color: 'text-green-500' });
    } else if (pw.length >= 6) {
      setPasswordStrength({ text: 'Medium', color: 'text-yellow-500' });
    } else {
      setPasswordStrength({ text: 'Weak', color: 'text-red-500' });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (Object.values(formData).some(field => field === '')) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
        // Create the user object for our fake login
        const newUser = {
            id: Date.now().toString(), // Create a simple unique ID
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            address: formData.address,
        };

        // ✅ FIX: Use the 'login' function from the context
        login(newUser);
        
        // ✅ FIX: Navigate to the correct lowercase path
        navigate("/dashboard");

    }, 1000);
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
          <p className="mt-2 text-white/70">
            Get personalized educational guidance
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Form fields remain the same */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80">Full Name</label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">Email address</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-white/80">Mobile Number</label>
            <input id="mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-white/80">Address</label>
            <textarea id="address" name="address" rows="2" required value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>
          {/* ✅ UNIFIED STYLES: Password fields now match the others */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">Password</label>
            <input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-white/60">
                {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
            </button>
          </div>
          {passwordStrength.text && <p className={`mt-1 text-xs ${passwordStrength.color}`}>Password strength: {passwordStrength.text}</p>}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-white/60">
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
            </button>
          </div>

          <div className="flex items-center">
            <input id="accept_terms" name="accept_terms" type="checkbox" required className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"/>
            <label htmlFor="accept_terms" className="ml-2 block text-sm text-white/80">I accept the <a href="#" className="text-purple-400 hover:underline">Terms and Conditions</a></label>
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 transition-transform duration-200 disabled:opacity-50">
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
