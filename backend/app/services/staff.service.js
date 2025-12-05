const Staff = require("../models/staff.model");
const ApiError = require("../utils/api-error");
const bcrypt = require("bcryptjs");

class StaffService {

     // Lay tat ca nhan vien
  static async getAllStaff() {
    return await Staff.find();
  }

     // Lay nhan vien theo ID
  static async getStaffById(id) {
    if (!id) throw ApiError.badRequest("Staff ID is required");
    const staff = await Staff.findById(id);
    if (!staff) throw ApiError.notFound("Staff not found");
    return staff;
  }

     // Cap nhat nhan vien
     static async updateStaff(id, data) {
      if (!id) throw ApiError.badRequest("Staff ID is required");
    
      const staff = await Staff.findById(id);
      if (!staff) throw ApiError.notFound("Staff not found");
    
      // Nếu có password mới → hash lại
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
    
      Object.assign(staff, data);
      return await staff.save();
    }

     // Xoa nhan vien
  static async deleteStaff(id) {
    if (!id) throw ApiError.badRequest("Staff ID is required");
    const staff = await Staff.findById(id);
    if (!staff) throw ApiError.notFound("Staff not found");

    await Staff.deleteOne({ _id: id });
    return { message: "Staff deleted successfully" };
  }
}

module.exports = StaffService;
