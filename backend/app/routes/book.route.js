const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.controller");

// Create a book
router.post("/", BookController.createBook);

// Get all books
router.get("/", BookController.getAllBooks);

// Get book by ID
router.get("/:id", BookController.getBookById);

// Update book by ID
router.put("/:id", BookController.updateBook);

// Delete book by ID (soft delete)
router.delete("/:id", BookController.deleteBook);

module.exports = router;
