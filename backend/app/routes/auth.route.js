const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// --- Staff routes ---
router.post('/staff/register', authController.registerStaff);
router.post('/staff/login', authController.loginStaff);

// --- Reader routes ---
router.post('/reader/register', authController.registerReader);
router.post('/reader/login', authController.loginReader);

module.exports = router;
