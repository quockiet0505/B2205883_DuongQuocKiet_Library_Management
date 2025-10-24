const Borrow = require("../models/borrow.model");
const Book = require("../models/book.model");
const ApiError = require("../utils/api-error");

class BorrowService {

     // Tao ban ghi muon sach moi
  static async createBorrow(data) {
    if (!data || !data.readerId || !data.bookId || !data.borrowDate || !data.returnDate)
      throw ApiError.badRequest("Reader ID, Book ID, borrow date and return date are required");

    const book = await Book.findById(data.bookId);
    if (!book) throw ApiError.notFound("Book not found");

    if (data.quantity && data.quantity > book.quantity)
      throw ApiError.badRequest("Requested quantity exceeds available stock");

    const borrow = new Borrow(data);
    return await borrow.save();
  }

//  Lay tat ca ban ghi muon sach
  static async getAllBorrows() {
    return await Borrow.find()
      .populate("bookId", "title")
      .populate("readerId", "firstName lastName");
  }

//  Lay ban ghi muon sach theo ID
  static async getBorrowById(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");

    const borrow = await Borrow.findById(id)
      .populate("bookId", "title")
      .populate("readerId", "firstName lastName");

    if (!borrow) throw ApiError.notFound("Borrow record not found");
    return borrow;
  }

//  Cap nhat ban ghi muon sach
  static async updateBorrow(id, data) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");

    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow record not found");

    if (data.quantity) {
      const book = await Book.findById(borrow.bookId);
      if (!book) throw ApiError.notFound("Book not found");
      if (data.quantity > book.quantity)
        throw ApiError.badRequest("Requested quantity exceeds available stock");
    }

    Object.assign(borrow, data);
    return await borrow.save();
  }

// Xoa ban ghi muon sach
  static async deleteBorrow(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow record not found");

    await Borrow.deleteOne({ _id: id });
    return { message: "Borrow record deleted successfully" };
  }
}

module.exports = BorrowService;
