const Borrow = require("../models/borrow.model");
const Book = require("../models/book.model");
const ApiError = require("../utils/api-error");

class BorrowService {
  // Sinh borrowId tự động BR001, BR002...
  static async generateBorrowId() {
    const last = await Borrow.findOne().sort({ createdAt: -1 });
    let newId = "BR001";
    if (last && last.borrowId) {
      const num = parseInt(last.borrowId.replace("BR", ""), 10) + 1;
      newId = `BR${String(num).padStart(3, "0")}`;
    }
    return newId;
  }

  // Tạo bản ghi mượn
  static async createBorrow(data) {
    if (!data || !data.readerId || !data.bookId)
      throw ApiError.badRequest("Reader ID and Book ID are required");

    const book = await Book.findOne({ bookId: data.bookId });
    if (!book) throw ApiError.notFound("Book not found");

    if (data.quantity && data.quantity > book.quantity)
      throw ApiError.badRequest("Requested quantity exceeds available stock");

    const borrowId = await this.generateBorrowId();

    const borrow = new Borrow({
      borrowId,               // dùng borrowId thay _id
      readerId: data.readerId,
      bookId: data.bookId,
      quantity: data.quantity || 1,
      borrowDate: data.borrowDate || new Date(),
      returnDate: data.returnDate || new Date(Date.now() + 7*24*60*60*1000),
      status: "processing"
    });

    return await borrow.save();
  }

  static async getAllBorrows() {
    return await Borrow.find()
      .populate("bookId", "title")
      .populate("readerId", "firstName lastName");
  }

  static async getBorrowById(borrowId) {
    if (!borrowId) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findOne({ borrowId })
      .populate("bookId", "title")
      .populate("readerId", "firstName lastName");
    if (!borrow) throw ApiError.notFound("Borrow record not found");
    return borrow;
  }

  static async updateBorrow(borrowId, data) {
    if (!borrowId) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findOne({ borrowId });
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

  static async deleteBorrow(borrowId) {
    if (!borrowId) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findOne({ borrowId });
    if (!borrow) throw ApiError.notFound("Borrow record not found");
    await Borrow.deleteOne({ borrowId });
    return { message: "Borrow record deleted successfully" };
  }
}

module.exports = BorrowService;
