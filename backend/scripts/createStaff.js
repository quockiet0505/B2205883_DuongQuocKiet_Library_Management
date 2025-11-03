const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Staff = require("../app/models/staff.model");

async function createStaff() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/library_management");
    console.log("Connected to MongoDB");

    // Xóa staff cũ nếu có
    await Staff.deleteOne({ email: "admin@library.com" });

    const hashedPassword = await bcrypt.hash("admin@123", 10);

    const staff = await Staff.create({
      staffId: "ST001",
      fullName: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: "0123456789",
      address: "123 Admin Street",
      position: "Manager",
    });

    console.log("✅ Staff created successfully!");
    console.log("📧 Email:", staff.email);
    console.log("🔑 Password: 123456");
    console.log("🆔 StaffID:", staff.staffId);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createStaff();
