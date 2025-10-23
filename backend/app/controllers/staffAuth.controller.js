const StaffAuthService = require("../services/staffAuth.service");

class StaffAuthController {
    static async register(req, res, next) {
        try {
            const staff = await StaffAuthService.register(req.body);
            res.status(201).json({
                message: "Staff registered successfully",
                data: staff,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const token = await StaffAuthService.login(req.body);
            res.status(200).json({
                message: "Staff logged in successfully",
                token,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = StaffAuthController;
