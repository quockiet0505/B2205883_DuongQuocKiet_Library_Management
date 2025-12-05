const Reader = require("../models/reader.model");
const ApiError = require("../utils/api-error");
const bcrypt = require("bcrypt");

class ReaderService {

  // Lấy tất cả doc gia
  static async getAllReaders() {
    return await Reader.find();
  }

  // Lấy doc gia theo ID (_id MongoDB)
  static async getReaderById(id) {
    if (!id) throw ApiError.badRequest("Reader ID is required");
  
    console.log("[Service] getReaderById input id:", id);
  
    let reader = null;
  
    //  _id (ObjectId)
    try {
      reader = await Reader.findById(id);
    } catch (e) {
      // Không tìm được 
    }
  
    // readerId: 
    if (!reader) {
      reader = await Reader.findOne({ readerId: id });
    }
  
    if (!reader) throw ApiError.notFound("Reader not found");
  
    console.log("[Service] Found reader:", reader.readerId || reader._id);
    return reader;
  }
  

  // Cập nhật doc gia theo _id
  static async updateReader(id, data) {
    if (!id) throw ApiError.badRequest("Reader ID is required");
  
    let reader = null;
  
    // Thử tìm theo _id
    try {
      reader = await Reader.findById(id);
    } catch (e) {}
  
    // Nếu không thấy thì tìm theo readerId
    if (!reader) {
      reader = await Reader.findOne({ readerId: id });
    }
  
    if (!reader) throw ApiError.notFound("Reader not found");
  
    // Nếu có đổi mật khẩu
    if (data.password) {
      if (data.password.length < 6) {
        throw ApiError.badRequest("Password must be at least 6 characters");
      }
  
      const hashed = await bcrypt.hash(data.password, 10);
      reader.password = hashed;
  
      delete data.password;
    }
  
    // Cập nhật field còn lại
    Object.assign(reader, data);
  
    return await reader.save();
  }
  

  // Xóa doc gia
  static async deleteReader(id) {
    if (!id) throw ApiError.badRequest("Reader ID is required");
  
    let reader = null;
  
    // Tìm theo _id
    try {
      reader = await Reader.findById(id);
    } catch (e) {}
  
    // Nếu không có  tìm theo readerId
    if (!reader) {
      reader = await Reader.findOne({ readerId: id });
    }
  
    if (!reader) throw ApiError.notFound("Reader not found");
  
    await Reader.deleteOne({ _id: reader._id });
  
    return { message: "Reader deleted successfully" };
  }
  
}

module.exports = ReaderService;
