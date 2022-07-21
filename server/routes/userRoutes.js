const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { authenticateJWT } = require('../utils/auth_middleware.js');

const {user_register,user_login,user_edit} = require('../controllers/userController')

// Add User/ Register
router.post("/new", wrapAsync(user_register))

// Login
router.post("/login", wrapAsync(user_login))

// Edit User
router.patch("/edit",authenticateJWT, wrapAsync(user_edit))

module.exports = router;