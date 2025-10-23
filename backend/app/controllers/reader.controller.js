const ReaderService = require("../services/reader.service");

class ReaderController {
    static async createReader(req, res, next) {
        try {
            const reader = await ReaderService.createReader(req.body);
            res.status(201).json({
                message: "Reader created successfully",
                data: reader,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllReaders(req, res, next) {
        try {
            const readers = await ReaderService.getAllReaders();
            res.status(200).json({
                message: "Readers retrieved successfully",
                data: readers,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getReaderById(req, res, next) {
        try {
            const reader = await ReaderService.getReaderById(req.params.id);
            res.status(200).json({
                message: "Reader retrieved successfully",
                data: reader,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateReader(req, res, next) {
        try {
            const reader = await ReaderService.updateReader(req.params.id, req.body);
            res.status(200).json({
                message: "Reader updated successfully",
                data: reader,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteReader(req, res, next) {
        try {
            const result = await ReaderService.deleteReader(req.params.id);
            res.status(200).json({
                message: "Reader deleted successfully",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ReaderController;
