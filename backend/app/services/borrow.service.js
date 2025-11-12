const Borrow = require("../models/borrow.model");
const Book = require("../models/book.model");
const ApiError = require("../utils/api-error");

class BorrowService {
  
  // Tạo bản ghi mượn
  static async createBorrow(data) {
    if (!data || !data.readerId || !data.bookId)
      throw ApiError.badRequest("Reader ID and Book ID are required");

    const book = await Book.findById(data.bookId);

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
    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow record not found");
  
    const book = await Book.findById(borrow.bookId);
    if (!book) throw ApiError.notFound("Book not found");
  
    const oldStatus = borrow.status;
    const newStatus = data.status;
  
    // Kiểm tra số lượng hợp lệ
    if (borrow.quantity < 1) {
      throw ApiError.badRequest("Borrow quantity must be at least 1");
    }
  
    // Khi admin accept => xác nhận ngày mượn thật
    if (oldStatus !== "accepted" && newStatus === "accepted") {
      if (borrow.quantity > book.quantity) {
        throw ApiError.badRequest("Not enough books in stock");
      }
  
      book.quantity -= borrow.quantity;
      await book.save();
  
      borrow.borrowDate = new Date();
      borrow.returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
  
    // Khi returned => hoàn sách
    if (oldStatus === "accepted" && newStatus === "returned") {
      book.quantity += borrow.quantity;
      await book.save();
    }
  
    // Khi refused => hoàn sách
    if (oldStatus === "accepted" && newStatus === "refused") {
      book.quantity += borrow.quantity;
      await book.save();
    }
  
    // Tính tiền phạt nếu trễ
    if (
      data.status === "overdue" ||
      (borrow.status === "accepted" && new Date() > borrow.returnDate)
    ) {
      const overdueDays = Math.max(
        0,
        Math.floor((new Date() - borrow.returnDate) / (1000 * 60 * 60 * 24))
      );
      borrow.fine = overdueDays * 2000;
    }
  
    Object.assign(borrow, data);
    const updated = await borrow.save();
  
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

  // Sửa huỷ phiếu mượn 
  static async cancelBorrow(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");
    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow record not found");
  
    if (borrow.status !== "processing") {
      throw ApiError.badRequest("Only processing borrows can be cancelled");
    }
  
    borrow.status = "cancelled";
    await borrow.save();
  
    return await Borrow.findById(id)
      .populate("bookId", "title author thumbnail")
      .populate("readerId", "firstName lastName email");
  }
  
}

module.exports = BorrowService;
