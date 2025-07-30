"use client";

import { Link } from "react-router-dom";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.jpg";

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
  {
    name: "Mobility & Errands Support",
    img: s5,
    path: "/make-your-package",
  },
];

const SpecializedServices = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 text-center">
          Our Specialized Services
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          WeCare offers a range of in-home services tailored for the comfort and
          well-being of seniors and differently-abled individuals.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {services.map((service) => (
            <Link
              to={service.path}
              key={service.name}
              className="flex flex-col items-center p-4 group bg-purple-50 rounded-xl hover:shadow-md transition"
            >
              <img
                src={service.img || "/placeholder.svg"}
                alt={service.name}
                className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-2xl mb-4 group-hover:scale-105 transition"
              />
              <span className="text-center text-md font-semibold text-purple-700 group-hover:text-purple-900">
                {service.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecializedServices;
