"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, ChevronDown, User2, ShoppingCart, LogOut, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "./CartContext"
import { useNavigate } from "react-router-dom";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Bookings", href: "/bookings" },
  { name: "About Us", href: "/about" },
]

const Navbar = () => {
  const [searchFocus, setSearchFocus] = useState(false)
  const { cart } = useCart()
  const cartCount = cart.length

  // Location selection logic
  const [locations, setLocations] = useState([])
  const [locationDropdown, setLocationDropdown] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(
    () => localStorage.getItem("selectedLocationName") || "Select Location",
  )
  const dropdownRef = useRef(null)
  const [loadingLocations, setLoadingLocations] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (locationDropdown && locations.length === 0) {
      setLoadingLocations(true)
      fetch('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/locations')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setLocations(data.locations)
          else setError(data.message || "Failed to load locations.")
        })
        .catch(() => setError("Network error."))
        .finally(() => setLoadingLocations(false))
    }
  }, [locationDropdown, locations.length])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLocationDropdown(false)
      }
    }
    if (locationDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [locationDropdown])

  // Handle geolocation
 // In frontend/src/components/Navbar.jsx

const handleGeoLocate = () => {
  if (!navigator.geolocation) {
    setError("Geolocation not supported.");
    return;
  }
  setGeoLoading(true);
  setError("");
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/locations/reverse-geocode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat: latitude, lng: longitude }),
        });
        const data = await res.json();
        
        if (data.success && data.location) {
          // This part is fine
          setSelectedLocation(data.location.name);
          localStorage.setItem("selectedLocationId", data.location.id);
          localStorage.setItem("selectedLocationName", data.location.name);
          setLocationDropdown(false);
        } else {
          // ✅ UPDATE THIS BLOCK
          // If the backend sent back the city name it detected...
          if (data.detectedCity) {
            // Set the main display to the detected city
            setSelectedLocation(data.detectedCity);
            // We don't save to localStorage since it's not a supported location
          }
          // Set the error message to show inside the dropdown
          setError(data.message || "Location not supported.");
        }
      } catch {
        setError("Failed to detect location.");
      }
      setGeoLoading(false);
    },
    () => {
      setError("Permission denied or unavailable.");
      setGeoLoading(false);
    }
  );
};

  // Handle manual selection
  const handleSelect = (loc) => {
    setSelectedLocation(loc.name)
    localStorage.setItem("selectedLocationId", loc.id)
    localStorage.setItem("selectedLocationName", loc.name)
    setLocationDropdown(false)
  }

  const [profileDropdown, setProfileDropdown] = useState(false)
  const profileRef = useRef(null)

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false)
      }
    }
    if (profileDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [profileDropdown])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload() // or use navigate('/login') if using react-router
  }

  // --- LOGIN STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("token")))

  useEffect(() => {
    // Listen for login/logout in other tabs
    const handleStorage = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")))
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  // Also update on mount and when token changes in this tab
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")))
  }, [])

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 px-4 lg:px-8 py-4 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-xl font-bold text-gray-800">WeCare</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Location Dropdown - Hidden on mobile */}
          <div className="relative min-w-max hidden sm:block" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-600 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition"
              onClick={() => setLocationDropdown((v) => !v)}
              type="button"
            >
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="truncate max-w-[120px]">{selectedLocation}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {locationDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-40 p-2">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition mb-1 disabled:opacity-60"
                  onClick={handleGeoLocate}
                  disabled={geoLoading}
                  type="button"
                >
                  <MapPin className="w-4 h-4" />
                  {geoLoading ? "Detecting..." : "Use my location"}
                </button>
                <div className="h-px bg-gray-100 my-2" />
                {loadingLocations ? (
                  <div className="text-center text-gray-400 py-2 text-sm">Loading locations...</div>
                ) : error ? (
                  <div className="text-center text-red-500 py-2 text-sm">{error}</div>
                ) : (
                  <ul className="max-h-56 overflow-y-auto">
                    {locations.map((loc) => (
                      <li key={loc.id}>
                        <button
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 transition text-gray-700 font-medium"
                          onClick={() => handleSelect(loc)}
                          type="button"
                        >
                          {loc.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                onClick={() => setProfileDropdown((v) => !v)}
                type="button"
              >
                <User2 className="w-6 h-6 text-gray-600 hover:scale-110 transition-transform" />
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-40 p-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-semibold hover:bg-purple-50 transition"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <User2 className="w-4 h-4" /> My Profile
                  </Link>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-purple-600 font-semibold hover:bg-red-50 transition mt-1"
                    onClick={handleLogout}
                    type="button"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/otp-login"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:from-purple-700 hover:to-pink-600 transition"
            >
              Login
            </Link>
          )}

          {/* Cart Button */}
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <ShoppingCart className="w-6 h-6 text-gray-600 hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full min-w-[20px] h-5 text-xs flex items-center justify-center font-bold shadow-sm px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Book Service Button */}
          <Link
            to="/book-service"
            className="hidden sm:inline-flex px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition shadow-sm"
          >
            Book Service
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-around">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-600 hover:text-purple-600 font-medium text-sm transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
