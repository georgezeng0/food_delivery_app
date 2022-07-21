const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { authenticateJWT } = require('../utils/auth_middleware.js');

const { reviews_get, reviews_new, reviews_edit, reviews_delete, reviews_updateRating } = require('../controllers/reviewController')

// Get reviews
router.get('/:r_id', wrapAsync(reviews_get))

// Create review
router.post('/new', authenticateJWT, wrapAsync(reviews_new))

// Edit review
router.patch('/:rev_id', authenticateJWT, wrapAsync(reviews_edit))


// Delete review
router.delete('/:rev_id',authenticateJWT, wrapAsync(reviews_delete))

//Update rating
router.post('/:r_id/update_rating', wrapAsync(reviews_updateRating))

module.exports = router;