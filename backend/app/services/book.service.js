const fs = require("fs");
const Book = require("../models/book.model");
const Publisher = require("../models/publisher.model");
const ApiError = require("../utils/api-error");

class BookService {

  // Tạo sách
  static async createBook(data) {
    if (!data || !data.title)
      throw ApiError.badRequest("Book title is required!");

    if (!data.author)
      throw ApiError.badRequest("Author is required!");

    if (!data.publisherId)
      throw ApiError.badRequest("Publisher is required!");

    if (!data.publishYear  || data.publishYear <0)
      throw ApiError.badRequest("PublishYear is required!");

    if (!data.quantity || data.quantity < 0)
      throw ApiError.badRequest("Quantity is required!");

    if (!data.publisherId)
      throw ApiError.badRequest("Publisher is required!");

    if (!data.price || data.price < 0)
      throw ApiError.badRequest("Price must be >= 0!");
    
    

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
      const publisher = await Publisher.findOne({ publisherId: data.publisherId });
      if (!publisher) throw ApiError.badRequest("Publisher not found!");
    }

    const newBook = new Book(data);
    return await newBook.save();
  }

  // Lấy tất cả sách
  static async getAllBooks() {
    console.log("Getting all books", await Book.find());
    return await Book.find(); // không populate nữa
  }

  // Lấy sách theo ID
  static async getBookById(id) {
    if (!id) throw ApiError.badRequest("Book ID is required");
    const book = await Book.findById(id);
    if (!book) throw ApiError.notFound("Book not found");
    return book;
  }

  // Cập nhật
  static async updateBook(id, data) {
    if (!id) throw ApiError.badRequest("Book ID is required");

    const book = await Book.findById(id);
    if (!book) throw ApiError.notFound("Book not found");

    if (data.publisherId) {
      const publisher = await Publisher.findOne({ publisherId: data.publisherId });
      if (!publisher) throw ApiError.badRequest("Publisher not found");
    }

    if (data.thumbnail && book.thumbnail && fs.existsSync(book.thumbnail)) {
      try { fs.unlinkSync(book.thumbnail); } catch {}
    }

    Object.assign(book, data);
    return await book.save();
  }

  // Xóa
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
