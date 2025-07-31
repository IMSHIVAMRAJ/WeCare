"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
// Added MapPin and Crosshair for the location feature
import { HomeIcon, CalendarCheck2, Info, LayoutGrid, MapPin, Crosshair } from "lucide-react"
import img1 from "../assets/1.png"
import s1 from "../assets/s1.jpg"
import s2 from "../assets/s2.jpg"
import s3 from "../assets/s3.jpg"
import s4 from "../assets/s4.jpg"
import s5 from "../assets/s5.jpg"
import t1 from "../assets/t1.png"
import t2 from "../assets/t2.png"
import t3 from "../assets/t3.png"

const services = [
  { name: "Grooming & Personal Care", img: s1, path: "/salon-at-home" },
  { name: "Medical & Hygiene Support", img: s2, path: "/makeup-at-home" },
  { name: "Physiotherapy & Massage", img: s3, path: "/pre-bridal" },
  { name: "Companionship & Mental Care", img: s4, path: "/hair-studio" },
  { name: 'Mobility & Errands Support', img: s5, path: '/make-your-package' },
]

const navLinks = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, path: "/" },
    { name: "Bookings", icon: <CalendarCheck2 className="w-6 h-6" />, path: "/bookings" },
    { name: "About Us", icon: <Info className="w-6 h-6" />, path: "/about" },
    { name: "Services", icon: <LayoutGrid className="w-6 h-6" />, path: "/book-service" },
]

const ServiceCard = ({ img, title, subtitle, price, tag, offer, rating, reviews }) => (
  <div className="bg-gray-100 rounded-xl shadow-sm flex flex-col h-full transition hover:shadow-lg relative">
    {/* Card content remains the same */}
  </div>
)

const Home = () => {
  const [trendingServices, setTrendingServices] = useState([])
  const [location, setLocation] = useState("Patna"); // State for location
  const navigate = useNavigate();

  // --- MODIFICATION START ---
  // Function to handle location detection
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setLocation("Detecting...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use these coordinates to get a city name via a reverse geocoding API.
          // For this demo, we'll just confirm detection and log the coordinates.
          console.log("Latitude:", position.coords.latitude, "Longitude:", position.coords.longitude);
          setLocation("Your Location"); // Update state to show detection was successful
          alert("Location detected successfully! Check the browser console for coordinates.");
        },
        (error) => {
          // Handle errors and reset location to default
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("You denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get your location timed out.");
              break;
            default:
              alert("An unknown error occurred while detecting location.");
              break;
          }
          setLocation("Patna"); // Reset to default on error
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocation("Patna"); // Reset to default if not supported
    }
  };
  // --- MODIFICATION END ---


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/services/trending`)
      .then((res) => setTrendingServices(res.data))
      .catch((err) => console.error("Error fetching trending services", err))
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-14 md:pb-0">
        {/* --- MODIFICATION START --- */}
        {/* Updated Location Bar for Mobile View with Detect Button */}
        <div className="md:hidden w-full bg-purple-100 p-2 flex items-center justify-between px-4">
            {/* Left side: Current Location Display */}
            <div className="flex items-center text-purple-800 font-semibold">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">Delivering to: {location}</span>
            </div>

            {/* Right side: Detect Location Button */}
            <button
                onClick={handleDetectLocation}
                className="flex items-center bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md hover:bg-purple-700 transition"
            >
                <Crosshair className="w-3 h-3 mr-1" />
                Use my location
            </button>
        </div>
        {/* --- MODIFICATION END --- */}


      <div className="w-full bg-blue-50 mb-4 sm:mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-gray-800 block">Dignified & Safe</span>
                  <span className="text-purple-600 block">Grooming Experience</span>
                  <span className="text-gray-800 block">at Home</span>
                </h1>
              </div>

              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Professional grooming and care services designed specifically for seniors and differently-abled
                individuals. Experience comfort, safety, and dignity in your own home.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigate("/book-service")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 transition shadow-lg font-semibold text-lg">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Book Now
                </button>
                <button onClick={() => navigate("/about")}
                className="border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600 text-gray-700 px-8 py-4 rounded-full transition font-semibold text-lg">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0 hidden lg:block">
              <div className="relative">
                <img
                  src={img1 || "/placeholder.svg"}
                  alt="Senior receiving professional care services at home"
                  className="w-80 sm:w-96 lg:w-[400px] xl:w-[450px] h-64 sm:h-80 lg:h-[320px] xl:h-[360px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Specialized Services Section */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-4xl font-bold text-purple-800 mb-4">Our Specialized Services</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Comprehensive grooming solutions designed specifically for seniors and individuals with special needs
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mt-0 px-2 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 min-h-[400px]">
          {services.map((service) => (
            <Link
              to={service.path}
              key={service.name}
              className="flex flex-col items-center cursor-pointer group p-2 sm:p-4"
            >
              <img
                src={service.img || "/placeholder.svg"}
                alt={service.name}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-2xl mb-3 sm:mb-5 group-hover:scale-105 transition"
              />
              <span className="text-lg sm:text-2xl font-bold text-purple-800 group-hover:text-purple-900 transition text-center">
                {service.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Rest of the component content... */}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-purple-100 flex justify-around items-center py-2 md:hidden z-30">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex flex-col items-center text-purple-600 hover:text-purple-800 transition"
          >
            {link.icon}
            <span className="text-xs mt-0.5">{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Home