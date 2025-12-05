const Borrow = require("../models/borrow.model");
const Book = require("../models/book.model");
const ApiError = require("../utils/api-error");

class BorrowService {
  // Tạo bản ghi mượn 
  static async createBorrow(data) {
    if (!data.readerId || !data.bookId)
      throw ApiError.badRequest("Reader ID and Book ID are required");

    // Tìm sách theo bookId dạng "B001"
    const book = await Book.findOne({ bookId: data.bookId });
    if (!book) throw ApiError.notFound("Book not found");

    if (data.quantity > book.quantity)
      throw ApiError.badRequest("Not enough books in stock");

    // Trừ sách khi tạo
    book.quantity -= data.quantity;
    await book.save();

    const now = new Date();

    const borrow = new Borrow({
      readerId: data.readerId,
      bookId: data.bookId,
      quantity: data.quantity,
      borrowDate: now,
      returnDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      status: "processing",
    });

    return await borrow.save();
  }

  // Lấy tất cả borrow
  static async getAllBorrows() {
    const borrows = await Borrow.find().sort({ createdAt: -1 });

    const now = new Date();
    console.log("Checking for overdue borrows at", now);
    for (let b of borrows) {
      if ((b.status === "accepted" || b.status === "overdue") && now > b.returnDate) {
        const overdueDays = Math.floor((now - b.returnDate) / (1000 * 60 * 60 * 24));
        b.fine = overdueDays * 2000;
        b.status = "overdue";

        console.log(`Borrow ${b._id} is overdue by ${overdueDays} days, fine updated to ${b.fine}`);
        await b.save();
    }
    
    }

    return borrows;
  }

  static async getBorrowById(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");

    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow record not found");

    return borrow;
  }

  static async getBorrowsByReaderId(readerId) {
    if (!readerId) throw ApiError.badRequest("Reader ID is required");

    return await Borrow.find({ readerId }).sort({ createdAt: -1 });
  }

  // Cập nhật borrow
  static async updateBorrow(id, data) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");

    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow not found");

    // Tìm sách theo mã "B001"
    const book = await Book.findOne({ bookId: borrow.bookId });
    if (!book) throw ApiError.notFound("Book not found");

    const oldStatus = borrow.status;
    const newStatus = data.status;

    // ACCEPT
    if (oldStatus === "processing" && newStatus === "accepted") {
      const start = new Date();
      borrow.borrowDate = start;
      borrow.returnDate = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);
      borrow.status = "accepted";
    }

    // REFUSE
    if (oldStatus !== "refused" && newStatus === "refused") {
      book.quantity += borrow.quantity;
      await book.save();
      borrow.status = "refused";
    }

    // CANCEL
    if (oldStatus === "processing" && newStatus === "cancelled") {
      book.quantity += borrow.quantity;
      await book.save();
      borrow.status = "cancelled";
    }

    // RETURNED
    if ((oldStatus === "accepted" || oldStatus === "overdue") && newStatus === "returned") {
      // Trả sách về kho
      book.quantity += borrow.quantity;
      await book.save();

      borrow.status = "returned";
      // borrow.fine = 0; 
    }


    // OVERDUE
    if (newStatus === "overdue") {
      const overdueDays = Math.max(
        0,
        Math.floor((new Date() - borrow.returnDate) / (1000 * 60 * 60 * 24))
      );
      borrow.fine = overdueDays * 2000;
      borrow.status = "overdue";
    }

    await borrow.save();
    return borrow;
  }

  static async deleteBorrow(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");

    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow record not found");

    // Nếu borrow được accept  trả sách lại
    if (borrow.status === "accepted") {
      const book = await Book.findOne({ bookId: borrow.bookId });
      if (book) {
        book.quantity += borrow.quantity;
        await book.save();
      }
    }

    await Borrow.deleteOne({ _id: id });

    return { message: "Borrow deleted" };
  }


  static async cancelBorrow(id) {
    if (!id) throw ApiError.badRequest("Borrow ID is required");
  
    const borrow = await Borrow.findById(id);
    if (!borrow) throw ApiError.notFound("Borrow not found");
  
    // Chỉ được hủy khi trạng thái là "processing"
    if (borrow.status !== "processing") {
      throw ApiError.badRequest("Only pending borrow requests can be cancelled");
    }
  
    // Trả sách lại kho
    const book = await Book.findOne({ bookId: borrow.bookId });
    if (book) {
      book.quantity += borrow.quantity;
      await book.save();
    }
  
    borrow.status = "cancelled";
    await borrow.save();
  
    return borrow;
  }
  
}

module.exports = BorrowService;
