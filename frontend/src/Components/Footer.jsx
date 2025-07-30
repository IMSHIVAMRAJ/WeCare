import { useState } from "react"
import { Phone } from "lucide-react"

const Footer = () => {
  // 1. We use state to control when the popup is visible
  const [showPopup, setShowPopup] = useState(false)

  // 2. This function shows the popup and sets a timer to hide it
  const handlePopup = () => {
    // If a popup is already showing, don't trigger another one
    if (showPopup) return;

    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 2500) // The popup will disappear after 2.5 seconds
  }

  return (
    <footer className="w-full">
      {/* 3. This is the new popup element, styled to be at the top */}
      <div
        className={`
          fixed top-5 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-in-out
          ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20 pointer-events-none"}
        `}
      >
        <div className="bg-purple-600 text-white px-5  py-3 rounded-xl shadow-lg font-semibold text-lg">
         Coming Soon!
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-12 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-2">Ready to Experience Dignified Care?</h2>
        <p className="mb-8 max-w-lg mx-auto">
          Join hundreds of satisfied families who trust WeCare for their grooming and care needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* 4. The onClick handler is added to the buttons */}
          <button
            onClick={handlePopup}
            className="bg-white text-indigo-600 hover:bg-gray-100 hover:text-indigo-700 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </button>
          <button
            onClick={handlePopup}
            className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 bg-transparent px-6 py-3 rounded-lg font-semibold transition"
          >
            Schedule Consultation
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-md">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-xl font-bold">WeCare</span>
            </div>
            <p className="text-gray-400 text-sm">
              Providing dignified, safe, and personalized grooming experiences for seniors and differently-abled individuals.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Grooming & Personal Care</a></li>
              <li><a href="#" className="hover:text-white transition">Medical & Hygiene Support</a></li>
              <li><a href="#" className="hover:text-white transition">Physiotherapy & Massage</a></li>
              <li><a href="#" className="hover:text-white transition">Companionship Care</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +919955399037
              </li>
              <li>sraj2004bxr@gmail.com</li>
              <li>Available Citywide</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Hours</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Monday - Friday: 8am - 8pm</li>
              <li>Saturday: 9am - 6pm</li>
              <li>Sunday: 10am - 4pm</li>
              <li className="text-indigo-400">24/7 Emergency Care</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-xs">
          <p>
            © {new Date().getFullYear()} WeCare. All rights reserved. |
            <a href="/privacy-policy" className="hover:text-white ml-1 mr-1">Privacy Policy</a> |
            <a href="/terms-of-service" className="hover:text-white ml-1">Terms of Service</a>
            <p>Made with ❤️ by Shivam Raj</p>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer