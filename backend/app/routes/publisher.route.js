const express = require('express');
const router = express.Router();
const PublisherController = require('../controllers/publisher.controller');

// Create a new publisher
router.post('/', PublisherController.createPublisher);

// Get all publishers
router.get('/', PublisherController.getAllPublishers);

// Get a publisher by ID
router.get('/:id', PublisherController.getPublisherById);

// Update a publisher by ID
router.put('/:id', PublisherController.updatePublisher);

// Delete a publisher by ID
router.delete('/:id', PublisherController.deletePublisher);

module.exports = router;