const Reader = require("../models/reader.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

class ReaderAuthService {
  static async login(identifier, password) {
    if (!identifier || !password)
      throw ApiError.badRequest("Email or password are required");

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) throw ApiError.badRequest("Invalid email format");
    
    const reader = await Reader.findOne({ email: identifier });
    if (!reader) throw ApiError.unauthorized("Reader not found");

    const isMatch = await bcrypt.compare(password, reader.password);
    if (!isMatch) throw ApiError.unauthorized("Invalid password");

    const token = jwt.sign({ id: reader._id, type: "reader" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return {
      token,
      reader: {
        id: reader._id,
        readerId: reader.readerId,
        firstName: reader.firstName,
        lastName: reader.lastName,
        phone: reader.phone,
        email: reader.email
      },
    };
  }

  static async register({ firstName, lastName, phone, email, password }) {
    if (!firstName || !lastName || !phone || !email || !password)
      throw ApiError.badRequest("All fields are required");

    // Regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");
    if (!phoneRegex.test(phone)) throw ApiError.badRequest("Invalid phone number");
    if (password.length < 6) throw ApiError.badRequest("Password must be at least 6 characters");

    // Tao ra ma doc gia
    const lastReader = await Reader.findOne().sort({ createdAt: -1 });
    let newReaderId = "R001";
    if (lastReader && lastReader.readerId) {
      const lastNumber = parseInt(lastReader.readerId.replace("R", ""), 10);
      newReaderId = `R${String(lastNumber + 1).padStart(3, "0")}`;
    }

    // Kiem tra trung emai va phone
    const existing = await Reader.findOne({ $or: [{ phone }, { email }] });
    if (existing) throw ApiError.badRequest("Email or phone already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const reader = await Reader.create({
      readerId: newReaderId,
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: reader._id, type: "reader" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return {
      token,
      reader: {
        id: reader._id,
        readerId: reader.readerId,
        firstName: reader.firstName,
        lastName: reader.lastName,
        phone: reader.phone,
        email: reader.email
      },
    };
  }
}

module.exports = ReaderAuthService;
