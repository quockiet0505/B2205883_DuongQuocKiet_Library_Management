const BookService = require("../services/book.service");

class BookController {
    static async createBook(req, res, next) {
        try {
            const book = await BookService.createBook(req.body);
            res.status(201).json({
                message: "Book created successfully",
                data: book,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllBooks(req, res, next) {
        try {
            const books = await BookService.getAllBooks();
            res.status(200).json({
                message: "Books retrieved successfully",
                data: books,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getBookById(req, res, next) {
        try {
            const book = await BookService.getBookById(req.params.id);
            res.status(200).json({
                message: "Book retrieved successfully",
                data: book,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const book = await BookService.updateBook(req.params.id, req.body);
            res.status(200).json({
                message: "Book updated successfully",
                data: book,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteBook(req, res, next) {
        try {
            const result = await BookService.deleteBook(req.params.id);
            res.status(200).json({
                message: "Book deleted successfully (soft delete)",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async hardDeleteBook(req, res, next) {
        try {
            const result = await BookService.hardDeleteBook(req.params.id);
            res.status(200).json({
                message: "Book permanently deleted successfully",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BookController;
