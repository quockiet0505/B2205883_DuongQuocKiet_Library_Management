const Borrow = require("../models/borrow.model");
const Book = require("../models/book.model");
const ApiError = require("../utils/api-error");

class BorrowService {
    // Tao muon sach moi
    static async createBorrow(data) {
        if (!data || !data.readerId || !data.bookId || !data.borrowDate || !data.returnDate) {
            throw ApiError.badRequest("Reader ID, Book ID, borrow date and return date are required");
        }

        const book = await Book.findOne({ _id: data.bookId, deleted: false });
        if (!book) throw ApiError.notFound("Book not found");

        if (data.quantity && data.quantity > book.quantity) {
            throw ApiError.badRequest("Requested quantity exceeds available book quantity");
        }

        const newBorrow = new Borrow(data);
        await newBorrow.save();
        return newBorrow;
    }

    // Lay tat ca sach
    static async getAllBorrows() {
        return await Borrow.find({ deleted: false })
            .populate("bookId", "title")
            .populate("readerId", "name");
    }

    // Lay phieu muon tu ID
    static async getBorrowById(id) {
        if (!id) throw ApiError.badRequest("Borrow ID is required");

        const borrow = await Borrow.findOne({ _id: id, deleted: false })
            .populate("bookId", "title")
            .populate("readerId", "name");

        if (!borrow) throw ApiError.notFound("Borrow record not found");
        return borrow;
    }

    // Cap nhat phieu muon
    static async updateBorrow(id, data) {
        if (!id) throw ApiError.badRequest("Borrow ID is required");

        const borrow = await Borrow.findOne({ _id: id, deleted: false });
        if (!borrow) throw ApiError.notFound("Borrow record not found");

        if (data.quantity) {
            const book = await Book.findOne({ _id: borrow.bookId, deleted: false });
            if (!book) throw ApiError.notFound("Book not found");
            if (data.quantity > book.quantity) throw ApiError.badRequest("Requested quantity exceeds available book quantity");
        }

        Object.assign(borrow, data);
        await borrow.save();
        return borrow;
    }

    // Xoa phieu muon (soft delete)
    static async deleteBorrow(id) {
        if (!id) throw ApiError.badRequest("Borrow ID is required");

        const borrow = await Borrow.findOne({ _id: id, deleted: false });
        if (!borrow) throw ApiError.notFound("Borrow record not found");

        borrow.deleted = true;
        borrow.deletedAt = new Date();
        await borrow.save();
        return { message: "Borrow record soft-deleted successfully" };
    }

    // Xoa phieu muon (hard delete)
    static async hardDeleteBorrow(id) {
        if (!id) throw ApiError.badRequest("Borrow ID is required");

        const borrow = await Borrow.findById(id);
        if (!borrow) throw ApiError.notFound("Borrow record not found");

        await Borrow.deleteOne({ _id: id });
        return { message: "Borrow record permanently deleted" };
    }
}

module.exports = BorrowService;
