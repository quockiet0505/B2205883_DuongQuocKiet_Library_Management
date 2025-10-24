const fs = require("fs");
const Book = require("../models/book.model");
const Publisher = require("../models/publisher.model");
const ApiError = require("../utils/api-error");

class BookService {

// Tao sach moi
  static async createBook(data) {
    if (!data || !data.title)
      throw ApiError.badRequest("Book title is required!");

    // Tạo bookId tự động
    if (!data.bookId) {
      const lastBook = await Book.findOne()
        .sort({ bookId: -1 })
        .collation({ locale: "en", numericOrdering: true });

      let newBookId = "B001";
      if (lastBook && lastBook.bookId) {
        const num = parseInt(lastBook.bookId.replace("B", ""), 10) + 1;
        newBookId = `B${String(num).padStart(3, "0")}`;
      }
      data.bookId = newBookId;
    }

    if (data.publisherId) {
      const publisher = await Publisher.findById(data.publisherId);
      if (!publisher) throw ApiError.badRequest("Publisher not found!");
    }

    const newBook = new Book(data);
    return await newBook.save();
  }

//   Lay tat ca sach

  static async getAllBooks() {
    return await Book.find().populate("publisherId", "name");
  }

//  Lay sach theo ID
  static async getBookById(id) {
    if (!id) throw ApiError.badRequest("Book ID is required");
    const book = await Book.findById(id).populate("publisherId", "name");
    if (!book) throw ApiError.notFound("Book not found");
    return book;
  }

//  Cap nhat sach
  static async updateBook(id, data) {
    if (!id) throw ApiError.badRequest("Book ID is required");

    const book = await Book.findById(id);
    if (!book) throw ApiError.notFound("Book not found");

    if (data.publisherId) {
      const publisher = await Publisher.findById(data.publisherId);
      if (!publisher) throw ApiError.badRequest("Publisher not found");
    }

    if (data.thumbnail && book.thumbnail && fs.existsSync(book.thumbnail)) {
      try { fs.unlinkSync(book.thumbnail); } catch {}
    }

    Object.assign(book, data);
    return await book.save();
  }

// Xoa sach
  static async deleteBook(id) {
    if (!id) throw ApiError.badRequest("Book ID is required");

    const book = await Book.findById(id);
    if (!book) throw ApiError.notFound("Book not found");

    if (book.thumbnail && fs.existsSync(book.thumbnail)) {
      try { fs.unlinkSync(book.thumbnail); } catch {}
    }

    await Book.deleteOne({ _id: id });
    return { message: "Book deleted successfully!" };
  }
}

module.exports = BookService;
