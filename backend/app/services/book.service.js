const fs = require("fs");
const Book = require("../models/book.model");
const Publisher = require("../models/publisher.model");
const ApiError = require("../utils/api-error");

class BookService {
    // tao sach moi
    static async createBook(data) {
        if (!data || !data.title) throw ApiError.badRequest("Book title is required!");

        // Tao bookId
        if (!data.bookId) {
            const lastBook = await Book.findOne()
                .sort({ bookId: -1 })
                .collation({ locale: "en", numericOrdering: true });

            let newBookId = "B001";
            if (lastBook && lastBook.bookId) {
                const lastNumber = parseInt(lastBook.bookId.replace("B", ""), 10);
                newBookId = `B${String(lastNumber + 1).padStart(3, "0")}`;
            }
            data.bookId = newBookId;
        }

        // Kiem tra publisherId neu co
        if (data.publisherId) {
            const publisher = await Publisher.findById(data.publisherId);
            if (!publisher) throw ApiError.badRequest("Publisher does not exist!");
        }

        try {
            const newBook = new Book(data);
            return await newBook.save();
        } catch (err) {
            console.log("Error creating book: ", err);

            // Xoa anh dai dien neu co loi
            if (data.thumbnail) {
                try {
                    await fs.promises.unlink(data.thumbnail);
                } catch (err) {
                    console.log("Error deleting thumbnail file: ", err);
                }
            }

            if (err.code === 11000) {
                throw ApiError.badRequest("Book ID or slug already exists!");
            }
            throw ApiError.badRequest("Invalid book data!");
        }
    }

    // Lay tat ca sach 
    static async getAllBooks() {
        return await Book.find({ deleted: false }).populate("publisherId", "name");
    }

    // Lay sach theo id
    static async getBookById(id) {
        if (!id) throw ApiError.badRequest("Book ID is required");

        const book = await Book.findOne({ _id: id, deleted: false }).populate("publisherId", "name");
        if (!book) throw ApiError.notFound("Book not found");
        return book;
    }

    // Cap nhat sach
    static async updateBook(id, data) {
        if (!id) throw ApiError.badRequest("Book ID is required");

        const book = await Book.findOne({ _id: id, deleted: false });
        if (!book) throw ApiError.notFound("Book not found");

        if (data.publisherId) {
            const publisher = await Publisher.findById(data.publisherId);
            if (!publisher) throw ApiError.badRequest("Publisher does not exist!");
        }

        if (data.thumbnail && book.thumbnail && fs.existsSync(book.thumbnail)) {
            try { fs.unlinkSync(book.thumbnail); } catch (err) { console.error("Error deleting old thumbnail:", err); }
        }

        Object.assign(book, data);
        await book.save();
        return book;
    }

    // Xoa sach (soft delete)
    static async deleteBook(id) {
        if (!id) throw ApiError.badRequest("Book ID is required");

        const book = await Book.findOne({ _id: id, deleted: false });
        if (!book) throw ApiError.notFound("Book not found");

        book.deleted = true;
        book.deletedAt = new Date();
        await book.save();
        return { message: "Book soft-deleted successfully" };
    }

    // Hard delete book
    static async hardDeleteBook(id) {
        if (!id) throw ApiError.badRequest("Book ID is required");

        const book = await Book.findById(id);
        if (!book) throw ApiError.notFound("Book not found");

        if (book.thumbnail && fs.existsSync(book.thumbnail)) {
            try { fs.unlinkSync(book.thumbnail); } catch (err) { console.error("Error deleting thumbnail:", err); }
        }

        await Book.deleteOne({ _id: id });
        return { message: "Book permanently deleted" };
    }
}

module.exports = BookService;
