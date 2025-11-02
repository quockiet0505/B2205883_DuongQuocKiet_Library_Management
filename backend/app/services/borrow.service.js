const Borrow = require("../models/borrow.model");
const Book = require("../models/book.model");
const ApiError = require("../utils/api-error");

class BorrowService {
  
  // Tạo bản ghi mượn
  static async createBorrow(data) {
    if (!data || !data.readerId || !data.bookId)
      throw ApiError.badRequest("Reader ID and Book ID are required");

    const book = await Book.findOne({ bookId: data.bookId });
    if (!book) throw ApiError.notFound("Book not found");

    if (data.quantity && data.quantity > book.quantity)
      throw ApiError.badRequest("Requested quantity exceeds available stock");

    const borrow = new Borrow({
      readerId: data.readerId,
      bookId: book._id, //  Lưu ObjectId của book
      quantity: data.quantity || 1,
      borrowDate: data.borrowDate || new Date(),
      returnDate: data.returnDate || new Date(Date.now() + 7*24*60*60*1000),
      status: "processing"
    });

    const saved = await borrow.save();
    
    // Populate để trả về đầy đủ thông tin
    return await Borrow.findById(saved._id)
      .populate("bookId", "bookId title author thumbnail price")
      .populate("readerId", "firstName lastName email");
  }

  static async getAllBorrows() {
    return await Borrow.find()
      .populate("bookId", "bookId title author thumbnail price")
      .populate("readerId", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  static async getBorrowById(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findById(id) //  Dùng findById với _id
      .populate("bookId", "bookId title author thumbnail price")
      .populate("readerId", "firstName lastName email");
    if (!borrow) throw ApiError.notFound("Borrow record not found");
    return borrow;
  }

  static async getBorrowsByReaderId(readerId) {
    if (!readerId) throw ApiError.badRequest("Reader ID is required");
    return await Borrow.find({ readerId })
      .populate("bookId", "bookId title author thumbnail price")
      .populate("readerId", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  static async updateBorrow(id, data) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findById(id); //  Dùng findById
    if (!borrow) throw ApiError.notFound("Borrow record not found");

    const book = await Book.findById(borrow.bookId);
    if (!book) throw ApiError.notFound("Book not found");

    const oldStatus = borrow.status;
    const newStatus = data.status;

    //  Trừ số lượng khi status chuyển sang "accepted"
    if (oldStatus !== "accepted" && newStatus === "accepted") {
      if (borrow.quantity > book.quantity) {
        throw ApiError.badRequest("Not enough books in stock");
      }
      book.quantity -= borrow.quantity;
      await book.save();
    }

    //  Cộng lại số lượng khi status chuyển sang "returned"
    if (oldStatus === "accepted" && newStatus === "returned") {
      book.quantity += borrow.quantity;
      await book.save();
    }

    //  Hoàn lại số lượng nếu từ "accepted" sang "refused"
    if (oldStatus === "accepted" && newStatus === "refused") {
      book.quantity += borrow.quantity;
      await book.save();
    }

    Object.assign(borrow, data);
    const updated = await borrow.save();
    
    // Populate để trả về đầy đủ thông tin
    return await Borrow.findById(updated._id)
      .populate("bookId", "bookId title author thumbnail price")
      .populate("readerId", "firstName lastName email");
  }

  static async deleteBorrow(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findById(id); //  Dùng findById
    if (!borrow) throw ApiError.notFound("Borrow record not found");

    // Nếu borrow đã được accepted, hoàn lại số lượng sách
    if (borrow.status === "accepted") {
      const book = await Book.findById(borrow.bookId);
      if (book) {
        book.quantity += borrow.quantity;
        await book.save();
      }
    }

    await Borrow.deleteOne({ _id: id });
    return { message: "Borrow record deleted successfully" };
  }
}

module.exports = BorrowService;
