const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staff.controller');

// Create a new staff member
router.post('/', StaffController.createStaff);

// Get all staff members
router.get('/', StaffController.getAllStaff);

// Get a staff member by ID
router.get('/:id', StaffController.getStaffById);

// Update a staff member by ID
router.put('/:id', StaffController.updateStaff);

// Delete a staff member by ID
router.delete('/:id', StaffController.deleteStaff);

module.exports = router;