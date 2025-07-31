// In your location routes file (e.g., locationRoutes.js)
import express from 'express';
import { getLocations, checkLocationByCoords } from '../controllers/locationController.js';


const router = express.Router();

// Route to get the list of all available locations
router.get("/", getLocations); // You can probably remove 'protect' and 'adminOnly' here too

// The new route for checking location by coordinates
router.post("/reverse-geocode", checkLocationByCoords); // Publicly accessible

export default router;