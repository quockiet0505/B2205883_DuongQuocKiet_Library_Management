const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Reader = require("../models/reader.model");
const Staff = require("../models/staff.model");
const ApiError = require("../utils/api-error");

// ------------------- STAFF -------------------
class StaffAuthService {
  static async login({ email, password } = {}) {
    email = (email || "").trim();
    if (!email) throw ApiError.badRequest("Email is required");
    if (!password) throw ApiError.badRequest("Password is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");

    const staff = await Staff.findOne({ email });
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

    const existing = await Staff.findOne({ email });
    if (existing) throw ApiError.badRequest("Email already exists");

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

// ------------------- READER -------------------
class ReaderAuthService {
  static async login({ email, password } = {}) {
    email = (email || "").trim();
    if (!email) throw ApiError.badRequest("Email is required");
    if (!password) throw ApiError.badRequest("Password is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");

    const reader = await Reader.findOne({ email });
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");
    if (!phoneRegex.test(phone)) throw ApiError.badRequest("Invalid phone number");
    if (password.length < 6) throw ApiError.badRequest("Password must be at least 6 characters");

    const lastReader = await Reader.findOne().sort({ createdAt: -1 });
    let newReaderId = "R001";
    if (lastReader && lastReader.readerId) {
      const lastNumber = parseInt(lastReader.readerId.replace("R", ""), 10);
      newReaderId = `R${String(lastNumber + 1).padStart(3, "0")}`;
    }

    const existing = await Reader.findOne({ email });
    if (existing) throw ApiError.badRequest("Email already exists");

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

module.exports = { StaffAuthService, ReaderAuthService };
