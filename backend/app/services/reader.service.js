const Reader = require("../models/reader.model");
const ApiError = require("../utils/api-error");

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

    const reader = await Reader.findById(id);
    if (!reader) throw ApiError.notFound("Reader not found");

    //  Nếu user muốn đổi mật khẩu
    if (data.password) {
      if (data.password.length < 6) {
        throw ApiError.badRequest("Password must be at least 6 characters");
      }

      const hashed = await bcrypt.hash(data.password, 10);
      reader.password = hashed;

      delete data.password; // xóa để tránh Object.assign ghi đè
    }

    // cập nhật các field khác
    Object.assign(reader, data);

    return await reader.save();
  }

  // Xóa doc gia
  static async deleteReader(id) {
    if (!id) throw ApiError.badRequest("Reader ID is required");

    const reader = await Reader.findById(id);
    if (!reader) throw ApiError.notFound("Reader not found");

    await Reader.deleteOne({ _id: reader._id });
    return { message: "Reader deleted successfully" };
  }
}

module.exports = ReaderService;
