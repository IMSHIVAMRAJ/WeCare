import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data);
      setForm({ fullName: data.fullName, email: data.email });
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/update`,
        {
          fullName: form.fullName,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(data);
      setSuccess("Profile updated successfully!");
      setEditing(false);
      setTimeout(() => setSuccess(""), 1500);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="p-10 text-center text-xl font-semibold text-gray-700">Loading profile...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-100 p-6">
      <form
        onSubmit={handleSave}
        className="bg-white/90 rounded-3xl shadow-xl px-10 py-12 w-full max-w-lg flex flex-col gap-6 border border-purple-300"
      >
        <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">My Profile</h2>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-purple-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-purple-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">Phone</label>
          <input
            value={user.phone}
            readOnly
            className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">Password</label>
          <input
            type="password"
            value="********"
            disabled
            className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {success && <div className="text-green-600 text-center font-semibold text-lg">{success}</div>}

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={!editing}
            className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-400 text-white rounded-xl font-bold text-lg shadow-md hover:scale-[1.02] transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {
              setForm({ fullName: user.fullName, email: user.email });
              setEditing(false);
            }}
            disabled={!editing}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg shadow-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
