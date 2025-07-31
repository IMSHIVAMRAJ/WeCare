"use client"

import { useEffect, useState } from "react"
// Use Link for internal navigation
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
// Updated icons for the new bottom navigation
import { HomeIcon, CalendarCheck2, Info, LayoutGrid } from "lucide-react"
import img1 from "../assets/1.png"
import s1 from "../assets/s1.jpg"
import s2 from "../assets/s2.jpg"
import s3 from "../assets/s3.jpg"
import s4 from "../assets/s4.jpg"
import s5 from "../assets/s5.jpg"
import t1 from "../assets/t1.png"
import t2 from "../assets/t2.png"
import t3 from "../assets/t3.png"

// NOTE: To fully match the mobile view, remove the top navigation bar component
// from your main layout file (e.g., App.jsx or a Layout.jsx).
// The component provided here has been updated to feature the requested bottom navigation.

const carouselImages = [
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=800",
  "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const promoImg =
  "https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const services = [
  {
    name: "Grooming & Personal Care",
    img: s1,
    path: "/salon-at-home",
  },
  {
    name: "Medical & Hygiene Support",
    img: s2,
    path: "/makeup-at-home",
  },
  {
    name: "Physiotherapy & Massage",
    img: s3,
    path: "/pre-bridal",
  },
  {
    name: "Companionship & Mental Care",
    img: s4,
    path: "/hair-studio",
  },
  { name: 'Mobility & Errands Support',
    img: s5,
    path: '/make-your-package' },
]

const trendingTabs = []

// --- MODIFICATION START ---
// Updated the navLinks array for the bottom navigation bar.
const navLinks = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, path: "/" },
    { name: "Bookings", icon: <CalendarCheck2 className="w-6 h-6" />, path: "/bookings" },
    { name: "About Us", icon: <Info className="w-6 h-6" />, path: "/about" },
    { name: "Services", icon: <LayoutGrid className="w-6 h-6" />, path: "/book-service" },
]
// --- MODIFICATION END ---


const ServiceCard = ({ img, title, subtitle, price, tag, offer, rating, reviews }) => (
  <div className="bg-gray-100 rounded-xl shadow-sm flex flex-col h-full transition hover:shadow-lg relative">
    <button className="absolute top-3 right-3 p-1 rounded-full bg-white hover:bg-gray-100 shadow text-gray-400">
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
    <img src={img || "/placeholder.svg"} alt={title} className="w-full h-40 object-contain p-4" />
    <div className="flex-1 flex flex-col px-4 pb-4">
      <div className="font-semibold text-base mt-2">{title}</div>
      <div className="text-xs text-gray-500 mb-1">{subtitle}</div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-purple-800 font-bold">{price}</span>
        {offer && <span className="text-xs text-green-500 font-semibold">{offer}</span>}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <span className="text-purple-800 font-bold">★ {rating}</span>
        <span>({reviews})</span>
      </div>
      <button className="mt-1 self-start bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full transition shadow-sm">
        {tag}
      </button>
    </div>
  </div>
)

const Home = () => {
  const [current, setCurrent] = useState(0)
  const [activeTrending, setActiveTrending] = useState(0)
  const [trendingServices, setTrendingServices] = useState([])
  const [showAllServices, setShowAllServices] = useState(false)
const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/services/trending`)
      .then((res) => setTrendingServices(res.data))
      .catch((err) => console.error("Error fetching trending services", err))
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-14 md:pb-0">
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

            {/* Right Image - Hidden on smaller screens for a mobile-first hero */}
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

      {/* Our Specialized Services */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-4xl font-bold text-purple-800 mb-4">Our Specialized Services</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Comprehensive grooming solutions designed specifically for seniors and individuals with special needs
          </p>
        </div>
      </section>

      {/* Categories */}
 <section className="mt-0 px-2 sm:px-4">
  <div className="flex justify-between items-center mb-4">
    {/* Optional heading ya controls yaha */}
  </div>

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


      {/* Why Choose WeCare */}
      <section className="w-full py-16 bg-blue-50 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">Why Choose WeCare?</h2>
            <p className="text-lg text-gray-600">Trusted by families across the community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Safety First */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety First</h3>
              <p className="text-gray-600 text-sm">Trained professionals with safety protocols</p>
            </div>

            {/* Home Comfort */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Home Comfort</h3>
              <p className="text-gray-600 text-sm">Services in your familiar environment</p>
            </div>

            {/* Expert Care */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Care</h3>
              <p className="text-gray-600 text-sm">Specialized training for senior care</p>
            </div>

            {/* Flexible Hours */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Hours</h3>
              <p className="text-gray-600 text-sm">Available when you need us most</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Services */}
      <section className="w-full max-w-[1400px] mx-auto bg-white rounded-2xl shadow p-2 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-xl font-semibold text-purple-800">Trending Services</h3>
        </div>
        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-4 overflow-x-auto scrollbar-hide">
          {trendingTabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTrending(idx)}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition ${activeTrending === idx ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {trendingServices.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">Loading services...</p>
          ) : (
           trendingServices.slice(0, 4).map((service, idx) => (
              <ServiceCard
                key={idx}
                img={service.mainImage}
      _template:           title={service.name}
                subtitle={service.subcategory}
                price={`₹${service.finalPrice}`}
                tag="Add to Cart"
                offer={`${service.discount}% OFF`}
                rating={4.9}
                reviews={120}
              />
            ))
          )}
        </div>
      </section>

      {/* What Our Families Say */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">What Our Families Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-400">
              <div className="flex items-center mb-4">
                <img
              _template:     src={t1}
                  alt="Margaret Johnson"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Margaret Johnson</h4>
                  <p className="text-sm text-gray-500">Age 78</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                "WeCare has been a blessing. The caregivers are so gentle and professional. I feel comfortable and
                dignified during every visit."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-400">
              <div className="flex items-center mb-4">
                <img
                  src={t2}
                  alt="Robert Chen"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Robert Chen</h4>
                  <p className="text-sm text-gray-500">Age 82</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                "As someone with mobility issues, WeCare makes everything possible again. They understand my needs
                perfectly."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-400">
              <div className="flex items-center mb-4">
                <img
                  src={t3}
                  alt="Sarah Williams"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Williams</h4>
                  <p className="text-sm text-gray-500">Daughter of Client</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                "WeCare gives me peace of mind knowing my mother receives excellent care. The staff is compassionate and
                skilled."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- MODIFICATION START --- */}
      {/* Bottom Nav - Updated to use Link and new nav items */}
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
      {/* --- MODIFICATION END --- */}
    </div>
  )
}

export default Home