const express = require('express');
const router = express.Router();

const ReaderController = require('../controllers/reader.controller');

// create a new reader
router.post('/', ReaderController.createReader);

// get all readers
router.get('/', ReaderController.getAllReaders);

// get a reader by id
router.get('/:id', ReaderController.getReaderById);

// update a reader by id
router.put('/:id', ReaderController.updateReader);

// delete a reader by id
router.delete('/:id', ReaderController.deleteReader);

module.exports = router;