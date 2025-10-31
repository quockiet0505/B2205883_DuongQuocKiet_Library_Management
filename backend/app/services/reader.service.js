const Reader = require("../models/reader.model");
const ApiError = require("../utils/api-error");

class ReaderService {

  // Lay tat ca doc gia
  static async getAllReaders() {
    return await Reader.find();
  }

  // Lay doc gia theo ID 
  static async getReaderById(id) {
    if (!id) throw ApiError.badRequest("Reader ID is required");

    console.log("[Service] getReaderById input id:", id);

    const reader = await Reader.findOne({ readerId: id });
    if (!reader) throw ApiError.notFound("Reader not found");

    console.log("[Service] Found reader:", reader.readerId);
    return reader;
  }

  // Cap nhat doc gia 
  static async updateReader(id, data) {
    if (!id) throw ApiError.badRequest("Reader ID is required");

    const reader = await Reader.findOne({ readerId: id });
    if (!reader) throw ApiError.notFound("Reader not found");

    Object.assign(reader, data);
    return await reader.save();
  }

  // Xoa doc gia 
  static async deleteReader(id) {
    if (!id) throw ApiError.badRequest("Reader ID is required");

    const reader = await Reader.findOne({ readerId: id });
    if (!reader) throw ApiError.notFound("Reader not found");

    await Reader.deleteOne({ _id: reader._id });
    return { message: "Reader deleted successfully" };
  }
}

module.exports = ReaderService;
