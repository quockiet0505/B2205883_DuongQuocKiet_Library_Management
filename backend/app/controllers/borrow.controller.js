const BorrowService = require("../services/borrow.service");

class BorrowController {
    static async createBorrow(req, res, next) {
        try {
            const borrow = await BorrowService.createBorrow(req.body);
            res.status(201).json({
                message: "Borrow record created successfully",
                data: borrow,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllBorrows(req, res, next) {
        try {
            const borrows = await BorrowService.getAllBorrows();
            res.status(200).json({
                message: "Borrow records retrieved successfully",
                data: borrows,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getBorrowById(req, res, next) {
        try {
            const borrow = await BorrowService.getBorrowById(req.params.id);
            res.status(200).json({
                message: "Borrow record retrieved successfully",
                data: borrow,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getBorrowsByReaderId(req, res, next) {
        try {
            const borrows = await BorrowService.getBorrowsByReaderId(req.params.readerId);
            res.status(200).json({
                message: "Borrow history retrieved successfully",
                data: borrows,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateBorrow(req, res, next) {
        try {
            const borrow = await BorrowService.updateBorrow(req.params.id, req.body);
            res.status(200).json({
                message: "Borrow record updated successfully",
                data: borrow,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteBorrow(req, res, next) {
        try {
            const result = await BorrowService.deleteBorrow(req.params.id);
            res.status(200).json({
                message: "Borrow record deleted successfully",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }


    static async cancelBorrow(req, res, next) {
        try {
          const borrow = await BorrowService.cancelBorrow(req.params.id);
          res.status(200).json({
            message: "Borrow request cancelled successfully",
            data: borrow,
          });
        } catch (err) {
          next(err);
        }
      }
      
}

module.exports = BorrowController;
