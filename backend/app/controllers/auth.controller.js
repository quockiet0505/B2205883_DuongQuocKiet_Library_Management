const {StaffAuthService, ReaderAuthService} = require("../services/auth.service");

class AuthController {

// Phan dang nhap dang ky nhan vien
 
  static async registerStaff(req, res, next) {
    try {
      const staff = await StaffAuthService.register(req.body);
      res.status(201).json({ message: "Staff registered successfully", staff });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  static async loginStaff(req, res) {
    try {
      const token = await StaffAuthService.login(req.body);
      res.status(200).json({ message: "Staff login successful", token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

// Phan dang nhap dang ky doc gia

  static async registerReader(req, res) {
    try {
      const reader = await ReaderAuthService.register(req.body);
      res.status(201).json({ message: "Reader registered successfully", reader });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  static async loginReader(req, res) {
    try {
      const token = await ReaderAuthService.login(req.body);
      res.status(200).json({ message: "Reader login successful", token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

 
}

module.exports = AuthController;
