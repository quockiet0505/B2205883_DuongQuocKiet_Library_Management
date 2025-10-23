const Staff = require("../models/staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

class StaffAuthService {
  static async login(identifier, password) {
    if (!identifier || !password)
      throw ApiError.badRequest("Email or phone and password are required");
      const staff = await Staff.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
      if (!staff) throw ApiError.unauthorized("Staff not found");

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) throw ApiError.unauthorized("Invalid password");

    const token = jwt.sign(
      { id: staff._id, role: staff.position, type: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    staff.token = token;
    await staff.save();

    return {
      token,
      staff: {
        id: staff._id,
        staffId: staff.staffId,
        fullName: staff.fullName,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
        position: staff.position,
        createdAt: staff.createdAt,
        updatedAt: staff.updatedAt,
      },
    };
  }

  static async register({ fullName, email, phone, password, address, position = "Staff" }) {
    if (!fullName || !email || !phone || !password)
      throw ApiError.badRequest("All fields are required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");
    if (!phoneRegex.test(phone)) throw ApiError.badRequest("Invalid phone number");
    if (password.length < 6) throw ApiError.badRequest("Password must be at least 6 characters");

    const existing = await Staff.findOne({ $or: [{ email }, { phone }] });
    if (existing) throw ApiError.badRequest("Email or phone already exists");

    const last = await Staff.findOne().sort({ createdAt: -1 });
    let newId = "S001";
    if (last && last.staffId) {
      const num = parseInt(last.staffId.replace("S", ""), 10) + 1;
      newId = `S${String(num).padStart(3, "0")}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await Staff.create({
      staffId: newId,
      fullName,
      email,
      phone,
      password: hashedPassword,
      address,
      position,
    });

    const token = jwt.sign(
      { id: staff._id, role: staff.position, type: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    staff.token = token;
    await staff.save();

    return {
      token,
      staff: {
        id: staff._id,
        staffId: staff.staffId,
        fullName: staff.fullName,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
        position: staff.position,
        createdAt: staff.createdAt,
        updatedAt: staff.updatedAt,
      },
    };
  }
}

module.exports = StaffAuthService;
