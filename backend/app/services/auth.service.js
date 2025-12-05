const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Reader = require("../models/reader.model");
const Staff = require("../models/staff.model");
const ApiError = require("../utils/api-error");

// ------------------- STAFF -------------------
class StaffAuthService {
  static async login({ email, password } = {}) {
    console.log(" Login attempt:", { email, password });
  
    email = (email || "").trim().toLowerCase();
    if (!email) throw ApiError.badRequest("Email is required");
    if (!password) throw ApiError.badRequest("Password is required");
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");
  
    const staff = await Staff.findOne({ email });
    if (!staff) {
      console.log(" Staff not found for email:", email);
      throw ApiError.unauthorized("Staff not found");
    }
  
    //  Log password hash và kết quả so sánh bcrypt
    console.log(" DB Hash:", staff.password);
    console.log(" Comparing:", password, "vs hash...");
  
    const isMatch = await bcrypt.compare(password, staff.password);
    console.log(" Compare result:", isMatch);
  
    if (!isMatch) {
      console.log(" Invalid password for:", email);
      throw ApiError.unauthorized("Invalid password");
    }
  
    console.log(" JWT_SECRET:", process.env.JWT_SECRET);

    // Nếu đúng thì tạo token
    const token = jwt.sign(
      { id: staff._id, role: staff.position, type: "staff" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  
    staff.token = token;
    await staff.save();
  
    console.log(" Login success for:", staff.email, "| Role:", staff.position);
  
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
    // if (!fullName || !email || !phone || !password)
    //   throw ApiError.badRequest("All fields are required");

    if(!fullName) throw ApiError.badRequest("Full name is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");

    if (!phoneRegex.test(phone)) throw ApiError.badRequest("Invalid phone number");

    if (password.length < 6) throw ApiError.badRequest("Password must be at least 6 characters");

    if(!address) throw ApiError.badRequest("Address is required");

    if(!position) throw ApiError.badRequest("Position is required");

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

  static async register({ firstName, lastName, email , phone, birthDate,gender, address, password }) {
    // if (!firstName || !lastName || !phone || !email || !password)
    //   throw ApiError.badRequest("All fields are required");
    if(!firstName) throw ApiError.badRequest("First name is required");
    if(!lastName) throw ApiError.badRequest("Last name is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,11}$/;
    if (!emailRegex.test(email)) throw ApiError.badRequest("Invalid email format");

    if (!phoneRegex.test(phone)) throw ApiError.badRequest("Invalid phone number");

    if(!birthDate) throw ApiError.badRequest("Birth date is required");

    if(!gender) throw ApiError.badRequest("Gender is required");

    if(!address) throw ApiError.badRequest("Address is required");


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
      email,
      phone,
      birthDate,
      gender,
      address,
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
        email: reader.email,
        phone: reader.phone,
        birthDate: reader.birthDate,
        gender: reader.gender,
        address: reader.address,
      },
    };
  }
}

module.exports = { StaffAuthService, ReaderAuthService };
