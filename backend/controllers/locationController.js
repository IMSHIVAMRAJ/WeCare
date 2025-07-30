import Location from "../models/location.js";
import NodeGeocoder from "node-geocoder";

// Configure the geocoder
const options = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE_API_KEY,
  formatter: null,
};
const geocoder = NodeGeocoder(options);

// ✅ ADD THIS ENTIRE FUNCTION
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ isActive: true }).sort({ city: 1 });
    const formattedLocations = locations.map(loc => ({
      id: loc._id,
      name: loc.city,
    }));
    res.status(200).json({ success: true, locations: formattedLocations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ success: false, message: "Failed to fetch locations." });
  }
};


// This is the function you already have
export const checkLocationByCoords = async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ success: false, message: "Coordinates are required." });
  }

  try {
    const geoResult = await geocoder.reverse({ lat: lat, lon: lng });
    if (!geoResult || geoResult.length === 0 || !geoResult[0].city) {
      return res.status(404).json({ success: false, message: "Could not determine city from coordinates." });
    }
    
    const detectedCity = geoResult[0].city;
    const locationInDb = await Location.findOne({ 
      city: new RegExp('^' + detectedCity + '$', 'i'),
      isActive: true 
    });

    if (locationInDb) {
      res.status(200).json({
        success: true,
        message: `Success! We are available in ${locationInDb.city}.`,
        location: {
          id: locationInDb._id,
          name: locationInDb.city,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        detectedCity: detectedCity,
        message: `Sorry, we are not yet available in ${detectedCity}.`,
      });
    }
  } catch (error) {
    console.error("Reverse geocode error:", error);
    res.status(500).json({ success: false, message: "Server error during location check." });
  }
};