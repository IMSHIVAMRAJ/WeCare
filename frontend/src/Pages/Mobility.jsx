import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCards from "../Components/ServiceCards";

const Mobility = () => {
  const [allServices, setAllServices] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    fetchSalonServices();
  }, []);

  const fetchSalonServices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/services/allservices`);
      const salonServices = res.data.filter(service => service.category === "Mobility");

      setAllServices(salonServices);

      // Unique subcategories with their image
      const uniqueSubCats = {};
      salonServices.forEach(service => {
        if (!uniqueSubCats[service.subcategory]) {
          uniqueSubCats[service.subcategory] = service.categoryImage;
        }
      });

      const finalSubCategories = Object.entries(uniqueSubCats).map(([name, image]) => ({
        name,
        image
      }));

      setSubCategories(finalSubCategories);
      setSelectedSubCategory(finalSubCategories[0]?.name || "");
    } catch (err) {
      console.error("Error fetching services:", err.message);
    }
  };

  const filteredServices = allServices.filter(
    s => s.subcategory === selectedSubCategory
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      <h1 className="text-2xl font-bold text-center mb-6 text-purple-600">
        Mobility & Errands Support
      </h1>

      {/* Horizontal Subcategories - Oval Image Style */}
      <div className="flex overflow-x-auto gap-6 mb-8 scrollbar-hide px-1">
        {subCategories.map((sub, i) => {
          const isActive = selectedSubCategory === sub.name;
          return (
            <button
              key={i}
              onClick={() => setSelectedSubCategory(sub.name)}
              className={`flex-shrink-0 flex flex-col items-center transition-all duration-300 p-2 focus:outline-none ${
                isActive ? "scale-105" : "opacity-80 hover:opacity-100"
              }`}
            >
              <div
                className={`w-20 h-20 border-4 ${
                  isActive ? "border-purple-600" : "border-gray-300"
                } rounded-full flex items-center justify-center overflow-hidden shadow-sm`}
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className={`mt-2 text-sm font-medium text-center ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`}
              >
                {sub.name}
              </p>
              {isActive && (
                <div className="h-1 w-6 bg-purple-600 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Service Cards */}
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        {selectedSubCategory}
      </h2>
      <ServiceCards services={filteredServices} />
    </div>
  );
};

export default Mobility;
