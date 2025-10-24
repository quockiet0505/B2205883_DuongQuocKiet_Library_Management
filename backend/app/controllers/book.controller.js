const BookService = require("../services/book.service");
const ApiError = require("../utils/api-error");

class BookController {
  static async createBook(req, res) {
    try {
      const book = await BookService.createBook(req.body);
      res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllBooks(req, res) {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBookById(req, res) {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateBook(req, res) {
    try {
      const book = await BookService.updateBook(req.params.id, req.body);
      if (!book) return res.status(404).json({ message: "Book not found" });
      res.status(200).json({ message: "Book updated successfully", book });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteBook(req, res) {
    try {
      const result = await BookService.deleteBook(req.params.id);
      if (!result) return res.status(404).json({ message: "Book not found" });
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BookController;
