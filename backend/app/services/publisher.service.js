const Publisher = require("../models/publisher.model");
const ApiError = require("../utils/api-error");

class PublisherService {

    // Tao nha xuat ban moi

    static async createPublisher(data) {
      if (!data || !data.name)
        throw ApiError.badRequest("Publisher name is required!");
    
      //  Tạo publisherId 
      if (!data.publisherId) {
        const lastPub = await Publisher.findOne()
          .sort({ publisherId: -1 })
          .collation({ locale: "en", numericOrdering: true });
    
        let newPublisherId = "P001";
    
        if (lastPub && lastPub.publisherId) {
          const num = parseInt(lastPub.publisherId.replace("P", ""), 10) + 1;
          newPublisherId = `P${String(num).padStart(3, "0")}`;
        }
    
        data.publisherId = newPublisherId;
      }
    
      // Check trùng tên
      const exist = await Publisher.findOne({ name: data.name });
      if (exist) throw ApiError.conflict("Publisher already exists!");
    
      const publisher = new Publisher(data);
      return await publisher.save();
    }
    

// Lay tat ca nha xuat ban
  static async getAllPublishers() {
    return await Publisher.find();
  }

//   Lay nha xuat ban theo ID
  static async getPublisherById(id) {
    if (!id) throw ApiError.badRequest("Publisher ID is required");
    const publisher = await Publisher.findById(id);
    if (!publisher) throw ApiError.notFound("Publisher not found");
    return publisher;
  }


    // Cap nhat nha xuat ban
  static async updatePublisher(id, data) {
    if (!id) throw ApiError.badRequest("Publisher ID is required");

    const publisher = await Publisher.findById(id);
    if (!publisher) throw ApiError.notFound("Publisher not found");

    Object.assign(publisher, data);
    return await publisher.save();
  }

    // Xoa nha xuat ban

  static async deletePublisher(id) {
    if (!id) throw ApiError.badRequest("Publisher ID is required");
    const publisher = await Publisher.findById(id);
    if (!publisher) throw ApiError.notFound("Publisher not found");

    await Publisher.deleteOne({ _id: id });
    return { message: "Publisher deleted successfully" };
  }
}

module.exports = PublisherService;
