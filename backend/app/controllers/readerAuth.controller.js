const ReaderAuthService = require("../services/readerAuth.service");

class ReaderAuthController {
    static async register(req, res, next) {
        try {
            const reader = await ReaderAuthService.register(req.body);
            res.status(201).json({
                message: "Reader registered successfully",
                data: reader,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const token = await ReaderAuthService.login(req.body);
            res.status(200).json({
                message: "Reader logged in successfully",
                token,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ReaderAuthController;
