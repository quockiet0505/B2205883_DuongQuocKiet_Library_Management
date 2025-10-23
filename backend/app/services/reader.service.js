const Reader = require("../models/reader.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

class ReaderAuthService {
  static async register({ firstName, lastName, birthDate, gender, address, phone, email, password }) {
    if (!firstName || !lastName || !email || !password)
      throw ApiError.badRequest("All fields are required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");
    if (phone && !phoneRegex.test(phone)) throw ApiError.badRequest("Invalid phone number");
    if (password.length < 6) throw ApiError.badRequest("Password must be at least 6 characters");

    const existing = await Reader.findOne({ $or: [{ email }, { phone }] });
    if (existing) throw ApiError.badRequest("Email or phone already exists");

    const last = await Reader.findOne().sort({ createdAt: -1 });
    let newId = "R001";
    if (last && last.readerId) {
      const num = parseInt(last.readerId.replace("R", ""), 10) + 1;
      newId = `R${String(num).padStart(3, "0")}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const reader = await Reader.create({
      readerId: newId,
      firstName,
      lastName,
      birthDate,
      gender,
      address,
      phone,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: reader._id, type: "reader" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    reader.token = token;
    await reader.save();

    return {
      token,
      reader: {
        id: reader._id,
        readerId: reader.readerId,
        firstName: reader.firstName,
        lastName: reader.lastName,
        birthDate: reader.birthDate,
        gender: reader.gender,
        address: reader.address,
        phone: reader.phone,
        email: reader.email,
        createdAt: reader.createdAt,
        updatedAt: reader.updatedAt,
      },
    };
  }

  static async login(identifier, password) {
    if (!identifier || !password)
      throw ApiError.badRequest("Email/phone and password are required");

    const reader = await Reader.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!reader) throw ApiError.unauthorized("Reader not found");

    const isMatch = await bcrypt.compare(password, reader.password);
    if (!isMatch) throw ApiError.unauthorized("Invalid password");

    const token = jwt.sign(
      { id: reader._id, type: "reader" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    reader.token = token;
    await reader.save();

    return {
      token,
      reader: {
        id: reader._id,
        readerId: reader.readerId,
        firstName: reader.firstName,
        lastName: reader.lastName,
        birthDate: reader.birthDate,
        gender: reader.gender,
        address: reader.address,
        phone: reader.phone,
        email: reader.email,
        createdAt: reader.createdAt,
        updatedAt: reader.updatedAt,
      },
    };
  }
}

module.exports = ReaderAuthService;
