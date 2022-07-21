const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { authenticateJWT } = require('../utils/auth_middleware.js');

// import controllers
const {
    dishes_get, dishes_new, dishes_delete, dishes_edit
} = require('../controllers/dishControllers')

router.get("/", wrapAsync(dishes_get))

// Create dish
router.post("/new",authenticateJWT, wrapAsync(dishes_new))

// Delete dish
router.delete("/:dish_id/:r_id",authenticateJWT, wrapAsync(dishes_delete))

// Edit dish
router.patch("/:dish_id",authenticateJWT, wrapAsync(dishes_edit))

module.exports = router;