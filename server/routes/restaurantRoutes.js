const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { authenticateJWT } = require('../utils/auth_middleware.js');
const { validateRestaurant } = require('../utils/joi_schema');

// import controllers
const {
    restaurants_get, restaurants_getOne, restaurants_getOwner,
    restaurants_new, restaurants_delete, restaurants_edit,restaurants_dishes
} = require('../controllers/restaurantControllers');


// Get all restaurants
router.get("/", wrapAsync(restaurants_get))

// Get one restaurant by ID
router.get("/:r_id", wrapAsync(restaurants_getOne))

// Get restaurant owner
router.get("/:r_id/owner", wrapAsync(restaurants_getOwner))

// Create restaurant
router.post("/new",authenticateJWT, validateRestaurant, wrapAsync(restaurants_new))

// Delete restaurant
router.delete("/:id",authenticateJWT, wrapAsync(restaurants_delete))

// Edut restaurant
router.patch("/:id", authenticateJWT, validateRestaurant, wrapAsync(restaurants_edit))

// Get dishes for one restaurant
router.get("/:restaurant_id/dishes", wrapAsync(restaurants_dishes))

module.exports = router;