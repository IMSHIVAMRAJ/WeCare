import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`; // change in production

const LoginWithEmail = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await res.json();
      // console.log("Login response:", data);

      if (res.ok && data.token) {
        // Set the token in local storage
        localStorage.setItem("token", data.token);
        
        // ✨ ADDED LINE: Notifies the Navbar to update instantly
        window.dispatchEvent(new Event("storage"));

        setSuccess("Login successful!");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#d1c4e9] to-[#ede7f6]">
      <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-lg p-8 rounded-2xl w-[90%] max-w-[400px]">
        <h2 className="text-gray-800 text-center font-bold text-2xl mb-6">
          Login to WeCare
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="10-digit phone"
              maxLength={10}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          {error && <div className="text-red-500 font-medium">{error}</div>}
          {success && <div className="text-green-500 font-medium">{success}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginWithEmail;